package org.generation.byteme.controller.dto;

public class NewsletterDTO {

    private String newsletterEmail;

    public NewsletterDTO(String newsletterEmail)
    {
        this.newsletterEmail = newsletterEmail;
    }

    public String getNewsletterEmail() {
        return newsletterEmail;
    }

    public void setNewsletterEmail(String newsletterEmail) {
        this.newsletterEmail = newsletterEmail;
    }
}
