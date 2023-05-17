package org.generation.byteme.service;

import org.generation.byteme.repository.entity.Newsletter;
import org.generation.byteme.repository.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class NewsletterServiceMySQL implements NewsletterService {

    private final NewsletterRepository newsletterRepository;

    public NewsletterServiceMySQL(@Autowired NewsletterRepository newsletterRepository)
    {
        this.newsletterRepository = newsletterRepository;
    }

    @Override
    public Newsletter save(Newsletter newsletter)
    {
        return this.newsletterRepository.save(newsletter);
    }

    @Override
    public void delete(int newsletterId)
    {
        newsletterRepository.deleteById(newsletterId);
    }

    @Override
    public ArrayList<Newsletter> all()
    {
        ArrayList<Newsletter> result = new ArrayList<>();
        newsletterRepository.findAll().forEach(result::add);
        return result;
    }

    @Override
    public Newsletter findById(int newsletterId)
    {
        Optional<Newsletter> newsletter = newsletterRepository.findById(newsletterId);
        Newsletter newsletterResponse = newsletter.get();
        return newsletterResponse;
    }
}
