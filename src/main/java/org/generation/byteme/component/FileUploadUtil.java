package org.generation.byteme.component;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;

import java.io.*;
import java.nio.file.*;

public class FileUploadUtil {

    public static String saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException
    {
        String connectStr2 = "...";
        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectStr2).buildClient();
        String containerName = "productimages";
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

        fileName = StringUtils.cleanPath(fileName);
        BlobClient blobClient = containerClient.getBlobClient(fileName);

        InputStream inputStream = multipartFile.getInputStream();
        blobClient.upload(inputStream, multipartFile.getSize(), true);

        return blobClient.getBlobUrl();
    }
}

//public class FileUploadUtil {
//
//    public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException
//    {
//
//        /* This is the setup using Azure storage */
//        String connectStr2 = "DefaultEndpointsProtocol=https;AccountName=bytemeproductimages;AccountKey=RCEQbYIsfgPJkuyyUJlalGHXWVqtHLdf1mFpQ3Uip8HQtjj+VzivOPJ+/uqx3VWzuCNR3uQNtSpf+AStljB0ag==;EndpointSuffix=core.windows.net";
//        BlobServiceClient blobServiceClient = new BlobServiceClientBuilder().connectionString(connectStr2).buildClient();
//        String containerName = "productimages";
//
//
//        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);
//
//
//        BlobClient blobClient = containerClient.getBlobClient(fileName);
//
//
//        InputStream inputStream = multipartFile.getInputStream();
//        blobClient.upload(inputStream);
//
//    }
//}
