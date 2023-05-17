package org.generation.byteme.repository;

import org.generation.byteme.repository.entity.Newsletter;
import org.springframework.data.repository.CrudRepository;

public interface NewsletterRepository extends CrudRepository<Newsletter, Integer> {

    // Nothing here as we can just use the methods from the CrudRepository object

}
