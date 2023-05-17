package org.generation.byteme.controller;

import org.generation.byteme.controller.dto.NewsletterDTO;
import org.generation.byteme.repository.entity.Newsletter;
import org.generation.byteme.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/newsletter")
public class NewsletterController {

    private final NewsletterService newsletterService;

    public NewsletterController(@Autowired NewsletterService newsletterService)
    {
        this.newsletterService = newsletterService;
    }

    @CrossOrigin
    @GetMapping("/all")
    public Iterable<Newsletter> getNewsletters()
    {

        return newsletterService.all();

    }

    // Get by Id
    @CrossOrigin
    @GetMapping( "/{id}" )
    public Newsletter findNewsletterById( @PathVariable Integer id )
    {
        return newsletterService.findById( id );
    }

    // To Delete
    @CrossOrigin
    @DeleteMapping( "/{id}" )
    public void delete( @PathVariable Integer id ) { newsletterService.delete( id );}

    // Set up post mapping and request

    @CrossOrigin
    @PostMapping("/add")
    public void save(@RequestParam(name="newsletterEmail", required = true) String newsletterEmail)
    {
        NewsletterDTO newsletterDto = new NewsletterDTO(newsletterEmail);
        newsletterService.save(new Newsletter(newsletterDto));
    }
}
