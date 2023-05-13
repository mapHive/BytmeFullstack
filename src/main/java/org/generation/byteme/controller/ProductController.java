package org.generation.byteme.controller;

import org.generation.byteme.component.FileUploadUtil;
import org.generation.byteme.controller.dto.ProductDTO;
import org.generation.byteme.repository.entity.Product;
import org.generation.byteme.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Value("${image.folder}")
    private String imageFolder;

    private final ProductService productService;

    public ProductController(@Autowired ProductService productService)
    {
        this.productService = productService;
    }

    @CrossOrigin
    @GetMapping("/all")
    public Iterable<Product> getProducts()
    {

            for (Product images : productService.all())
            {
                String setURL = imageFolder + "/" + images.getProductImages();
                images.setProductImages(setURL);
            }
            return productService.all();

    }

    // Get by Id
    @CrossOrigin
    @GetMapping( "/{id}" )
    public Product findProductById( @PathVariable Integer id )
    {
        return productService.findById( id );
    }

    // To Delete
    @CrossOrigin
    @DeleteMapping( "/{id}" )
    public void delete( @PathVariable Integer id ) { productService.delete( id );}

    // Set up post mapping and request

    @CrossOrigin
    @PostMapping("/add")
    public void save(@RequestParam(name="productName", required = true) String productName,
                     @RequestParam(name="productPrice", required = true) double productPrice,
                     @RequestParam(name="productQuantity", required = true) Integer productQuantity,
                     @RequestParam(name="productCategory", required = true) String productCategory,
                     @RequestParam(name="productDescription", required = true) String productDescription,
                     @RequestParam(name="productOptions", required = false) String productOptions,
                     @RequestParam(name="productImages", required = true) String productImages,
                     @RequestParam("imagefile") MultipartFile multipartFile) throws IOException
    {
        String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename());

        FileUploadUtil.saveFile(imageFolder, fileName, multipartFile);

        ProductDTO productDto = new ProductDTO(productName, productPrice, productQuantity, productCategory, productDescription, productOptions, productImages);
        productService.save(new Product(productDto));
    }
}
