package com.example.demo.repositories;

import java.io.ByteArrayInputStream;

public interface ImageStorageRepository {
    public String uploadImage(ByteArrayInputStream byteArrayInputStream, String imageName);
}
