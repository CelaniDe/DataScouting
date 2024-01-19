package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.example.demo.models.Image;
import com.example.demo.services.ImageService;

import java.io.InputStream;
import java.util.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/api/images")
public class ImageController 
{
    private final ImageService service;

    @Autowired
    public ImageController(ImageService service)
    {
        this.service = service;
    }

    @GetMapping("/")
    public List<Image> getMethodName() {
        return service.getAllImages();
    }
        

    @GetMapping("/json")
    public String getJsonResponse() {
        return "{\"message\": \"This is a JSON image controller response\"}";
    }

    @PostMapping(value = "/detect_json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getMethodName(@RequestParam("file") MultipartFile imageRequest) {

        String s = service.getJsonFromDetection(imageRequest);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }

    @PostMapping(value = "/detect_image")
    public ResponseEntity<InputStreamResource> getMethodNameImage(@RequestParam("file") MultipartFile imageRequest) {

        InputStream s = service.getImageFromDetection(imageRequest);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(new InputStreamResource(s), headers, HttpStatus.OK);
    }
    

}
