package org.generation.byteme.service;

import org.generation.byteme.repository.entity.Product;

import java.util.ArrayList;

public interface ProductService {

    // Save method has two purposes - create a new item and update an existing one
    Product save(Product product);

    // Delete item form database based on productId
    void delete(int productId);

    // Read all items from database
    ArrayList<Product> all();

    // Read an item from database based on productId
    Product findById(int productId);

}
