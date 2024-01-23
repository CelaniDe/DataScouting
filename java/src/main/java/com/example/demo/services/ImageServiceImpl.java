package com.example.demo.services;


import okhttp3.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.Image;
import com.example.demo.repositories.AppwriteStorage;
import com.example.demo.repositories.ImageRepository;
import com.example.demo.repositories.ImageStorageRepository;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import java.util.Date;

import org.slf4j.Logger; 
import org.slf4j.LoggerFactory;


@Service
public class ImageServiceImpl implements ImageService {

    private final ImageRepository imageRepository;
    private final ImageStorageRepository imageStorageRepository;
    Logger logger = LoggerFactory.getLogger(ImageServiceImpl.class);

    
    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository,ImageStorageRepository imageStorageRepository) {
        this.imageRepository = imageRepository;
        this.imageStorageRepository = imageStorageRepository;
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

            String timestamp = Long.toString(System.currentTimeMillis());



            String responseMessage = this.imageStorageRepository.uploadImage(new ByteArrayInputStream(requestImage.getBytes()),timestamp + requestImage.getOriginalFilename());

            // logger.debug("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa " + response.getBody());
            System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaa " + responseMessage);
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
            String timestamp = Long.toString(System.currentTimeMillis());
            InputStream mlImage = response.getBody();
            byte[] mlImageBytes = mlImage.readAllBytes();
            String responseMessage1 = this.imageStorageRepository.uploadImage(new ByteArrayInputStream(mlImageBytes),"detected_" + timestamp + requestImage.getOriginalFilename());
            String responseMessage2 = this.imageStorageRepository.uploadImage(new ByteArrayInputStream(requestImage.getBytes()),"original_" + timestamp + requestImage.getOriginalFilename());
            Image model_image = new Image();
            model_image.userName = "manolis";
            model_image.originalLink = "https://firebasestorage.googleapis.com/v0/b/datascouting-522d6.appspot.com/o/" + "original_" + timestamp + requestImage.getOriginalFilename() + "?alt=media";
            model_image.detectedLink = "https://firebasestorage.googleapis.com/v0/b/datascouting-522d6.appspot.com/o/" + "detected_" + timestamp + requestImage.getOriginalFilename() + "?alt=media";
            imageRepository.save(model_image);
            return new ByteArrayInputStream(mlImageBytes);
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
