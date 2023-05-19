package org.generation.byteme.controller;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
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

//            for (Product images : productService.all())
//            {
//                String setURL = imageFolder + "/" + images.getProductImages();
//                images.setProductImages(setURL);
//            }

        /* To display images from the Server Container */
        String connectStr2 = "DefaultEndpointsProtocol=https;AccountName=bytemeproductimages;AccountKey=RCEQbYIsfgPJkuyyUJlalGHXWVqtHLdf1mFpQ3Uip8HQtjj+VzivOPJ+/uqx3VWzuCNR3uQNtSpf+AStljB0ag==;EndpointSuffix=core.windows.net";
        //System.out.println("Connect String: " + connectStr2);
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectStr2).buildClient();
        String containerName = "productimages";
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);


        //Loop through the ArrayList of productService.all() and append the Blob url to the imageUrls
        for (Product product: productService.all())
        {
            // For productImage1
            BlobClient blobClient1 = containerClient.getBlobClient(product.getProductImage1());
            String setURL1 = blobClient1.getAccountUrl() + "/" + containerName + "/" + product.getProductImage1();
            product.setProductImage1(setURL1);
            System.out.println(setURL1);

            // For productImage2
            BlobClient blobClient2 = containerClient.getBlobClient(product.getProductImage2());
            String setURL2 = blobClient2.getAccountUrl() + "/" + containerName + "/" + product.getProductImage2();
            product.setProductImage2(setURL2);
            System.out.println(setURL2);

            // For productImage3
            BlobClient blobClient3 = containerClient.getBlobClient(product.getProductImage3());
            String setURL3 = blobClient3.getAccountUrl() + "/" + containerName + "/" + product.getProductImage3();
            product.setProductImage3(setURL3);
            System.out.println(setURL3);
        }

        //return in the Controller represents a response to the Client

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

    @PostMapping("/add")
    public void save(@RequestParam(name="productName", required = true) String productName,
                     @RequestParam(name="productPrice", required = true) double productPrice,
                     @RequestParam(name="productQuantity", required = true) Integer productQuantity,
                     @RequestParam(name="productCategory", required = true) String productCategory,
                     @RequestParam(name="productDescription", required = true) String productDescription,
                     @RequestParam(name="productOptions", required = false) String productOptions,
                     @RequestParam(name="productImage1", required = true) String productImage1,
                     @RequestParam("imagefile1") MultipartFile multipartFile1,
                     @RequestParam(name="productImage2", required = true) String productImage2,
                     @RequestParam("imagefile2") MultipartFile multipartFile2,
                     @RequestParam(name="productImage3", required = true) String productImage3,
                     @RequestParam("imagefile3") MultipartFile multipartFile3) throws IOException
    {
        FileUploadUtil.saveFile(imageFolder, productImage1, multipartFile1);
        FileUploadUtil.saveFile(imageFolder, productImage2, multipartFile2);
        FileUploadUtil.saveFile(imageFolder, productImage3, multipartFile3);

        ProductDTO productDto = new ProductDTO(productName, productPrice, productQuantity, productCategory, productDescription, productOptions, productImage1, productImage2, productImage3);
        productService.save(new Product(productDto));
    }



}
