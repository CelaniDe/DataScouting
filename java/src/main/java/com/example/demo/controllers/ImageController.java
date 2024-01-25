package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    @CrossOrigin(origins = "*")
    public List<Image> getMethodName() {
        return service.getAllImages();
    }

    @GetMapping("/my")
    @CrossOrigin(origins = "*")
    public List<Image> getMyImages() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getName());
        return service.getAllImagesByUsername(authentication.getName());
    }
        

    @GetMapping("/json")
    @CrossOrigin(origins = "*")
    public String getJsonResponse() {
        return "{\"message\": \"This is a JSON image controller response\"}";
    }

    @PostMapping(value = "/detect_json", produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> getMethodName(@RequestParam("file") MultipartFile imageRequest) {

        String s = service.getJsonFromDetection(imageRequest);
        return new ResponseEntity<>(s, HttpStatus.OK);
    }

    @PostMapping(value = "/detect_image")
    @CrossOrigin(origins = "*")
    public ResponseEntity<InputStreamResource> getMethodNameImage(@RequestParam("file") MultipartFile imageRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getName());
        InputStream s = service.getImageFromDetection(imageRequest);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(new InputStreamResource(s), headers, HttpStatus.OK);
    }
    

}
