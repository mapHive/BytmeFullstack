package org.generation.byteme.service;

import org.generation.byteme.repository.entity.Product;
import org.generation.byteme.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class ProductServiceMySQL implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceMySQL(@Autowired ProductRepository productRepository)
    {
        this.productRepository = productRepository;
    }

    @Override
    public Product save(Product product)
    {
        return this.productRepository.save(product);
    }

    @Override
    public void delete(int productId)
    {
        productRepository.deleteById(productId);
    }

    @Override
    public ArrayList<Product> all()
    {
        ArrayList<Product> result = new ArrayList<>();
        productRepository.findAll().forEach(result::add);
        return result;
    }

    @Override
    public Product findById(int productId)
    {
        Optional<Product> product = productRepository.findById(productId);
        Product productResponse = product.get();
        return productResponse;
    }
}
