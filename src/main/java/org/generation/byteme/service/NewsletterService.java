package org.generation.byteme.service;

import org.generation.byteme.repository.entity.Newsletter;

import java.util.ArrayList;

public interface NewsletterService {

    // Save method has two purposes - create a new item and update an existing one
    Newsletter save(Newsletter newsletter);

    void delete(int newsletterId);

    // Read all items from database
    ArrayList<Newsletter> all();

    Newsletter findById(int newsletterId);

}