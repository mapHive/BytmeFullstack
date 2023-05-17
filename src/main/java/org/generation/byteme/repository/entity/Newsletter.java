package org.generation.byteme.repository.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.generation.byteme.controller.dto.NewsletterDTO;

@Entity
public class Newsletter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer newsletterId;
    private String newsletterEmail;

    public Newsletter() {

    }

    public Newsletter(NewsletterDTO newsletterDto)
    {
        this.newsletterEmail = newsletterDto.getNewsletterEmail();
    }

    public Integer getNewsletterId() {
        return newsletterId;
    }

    public void setNewsletterId(Integer newsletterId) {
        this.newsletterId = newsletterId;
    }

    public String getNewsletterEmail() {
        return newsletterEmail;
    }

    public void setNewsletterEmail(String newsletterEmail) {
        this.newsletterEmail = newsletterEmail;
    }

    @Override
    public String toString() {
        return "Newsletter{" +
                "newsletterId=" + newsletterId +
                ", newsletterEmail='" + newsletterEmail + '\'' +
                '}';
    }
}
