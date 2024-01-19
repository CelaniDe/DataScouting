package com.example.demo.controllers.DTO;

import org.springframework.web.multipart.MultipartFile;

public class ImageRequest {
    // You can add more fields as needed
    private MultipartFile image;

    // Getter and setter for the image field
    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
}
