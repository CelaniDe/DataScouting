package com.example.demo.services;


import okhttp3.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.Image;
import com.example.demo.repositories.ImageRepository;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;


@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;

    
    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }



    @Override
    public List<Image> getAllImages() {
        return imageRepository.findAll();
    }

    public String getJsonFromDetection(MultipartFile requestImage){
        Unirest.setTimeouts(0, 0);
        try {
            HttpResponse<String> response = Unirest.post("http://localhost:8000/detect_objects/")
            .field("file", new ByteArrayInputStream(requestImage.getBytes()),requestImage.getOriginalFilename())
            .asString();

            // return response.getBody();
            return response.getBody();
        } catch (UnirestException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return "okay man";
    }



    @Override
    public InputStream getImageFromDetection(MultipartFile requestImage) {
        try {
            HttpResponse<InputStream> response = Unirest.post("http://localhost:8000/detect_objects_image/")
            .field("file", new ByteArrayInputStream(requestImage.getBytes()),requestImage.getOriginalFilename())
            .asBinary();

            // return response.getBody();
            return response.getBody();
        } catch (UnirestException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return null;
    }
    
}
