package org.generation.byteme.repository;

import org.generation.byteme.repository.entity.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer> {

    // Nothing here as we can just use the methods from the CrudRepository object

}
