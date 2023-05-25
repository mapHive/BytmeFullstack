package org.generation.byteme.security;

import org.springframework.beans.factory.annotation.*;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.authentication.builders.*;
import org.springframework.security.config.annotation.web.builders.*;
import org.springframework.security.config.annotation.web.configuration.*;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.*;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Autowired
    private DataSource dataSource;


    /*  https://www.tabnine.com/code/java/methods/org.springframework.security.config.annotation.authentication.configurers.provisioning.JdbcUserDetailsManagerConfigurer/authoritiesByUsernameQuery
     */
    // To use the dependency injection method to inject the DataSource interface to WebSecurityConfig Class so that we can ust the properties or methods from the DataSource Object
    // Purpose is to make use of the details we put in the application.properties to be able to make a connection to our SQL server and access our schema

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth)
            throws Exception {

        // When a user is authenticated, Spring Security will create a user session
        // Spring Security object will also be responsible to manage the session (e.g. timeout, errors)
        // Spring Security object will need to end the user session if logout or timeout

        // In an SQL query, we can get the information from the front-end with through the '?' symbol
        // Sending of the information from the front-end is through Thymeleaf

        // AuthenticationManagerBuilder provides a userByUsernameQuery method
        // 1) Query to get the username, password, enabled from our users table that matches what the front-end sends to us (admin)
        // 2) userByUsernameQuery method will check the password matches and check if enabled is 1
        // 3) authoriseByUsernameQuery method - to retrieve the role of this user

        auth.jdbcAuthentication()
                .passwordEncoder(new BCryptPasswordEncoder())
                .dataSource(dataSource)
                .usersByUsernameQuery("select userName, userPassword, userEnabled from user where userName=?")
                .authoritiesByUsernameQuery("select userName, userRole from user where userName=?");
    }
    /*
    https://docs.spring.io/spring-security/reference/servlet/authentication/passwords/jdbc.html
    */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // After the authentication has been done, and user is logged in and session is active, we need to set up the security policy for the http pages that we are able to access

        http
                .csrf().disable();

        http.formLogin().loginPage("/login");

        http.formLogin()
                .defaultSuccessUrl("/index", true);

        http.logout()
                .logoutSuccessUrl("/index");

        // Which are the pages or resources that we allow users to access without logging in
        // Which are the page(s) that need to have an Admin role before users can access

        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/", "/css/**", "/images/**", "/js/**", "/about/**", "/common/**", "/form/**", "/homepage/**", "/login/**", "/shop/**", "/aboutus", "/category", "/index","/login", "/product", "/shop", "/productimages/**", "/product/**", "/newsletter/**").permitAll()
                .requestMatchers("/formpage/**").hasRole("ADMIN")
        );
        return http.build();
    }
}
