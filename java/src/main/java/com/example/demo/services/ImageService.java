package com.example.demo.services;

import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.example.demo.models.Image;

public interface ImageService {
    List<Image> getAllImages();
    List<Image> getAllImagesByUsername(String username);
    public String getJsonFromDetection(MultipartFile requestImage);
    public InputStream getImageFromDetection(MultipartFile requestImage);
}

