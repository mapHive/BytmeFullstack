package org.generation.byteme.repository;

import org.generation.byteme.repository.entity.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepository extends CrudRepository<Product, Integer> {

    // Nothing here as we can just use the methods from the CrudRepository object

    @Query("SELECT p FROM Product p WHERE p.productName LIKE %:keyword% OR p.productCategory LIKE %:keyword% OR p.productDescription LIKE %:keyword%")
    List<Product> search(String keyword);

}
