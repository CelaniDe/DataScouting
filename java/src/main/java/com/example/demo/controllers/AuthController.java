package com.example.demo.controllers;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.security.access.prepost.PreAuthorize; 
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken; 
import org.springframework.security.core.Authentication; 
import org.springframework.security.core.userdetails.UsernameNotFoundException; 
import org.springframework.web.bind.annotation.*;

import com.example.demo.JWT.JwtService;
import com.example.demo.JWT.JwtUtil;
import com.example.demo.controllers.DTO.AuthRequest;
import com.example.demo.models.UserInfo;
import com.example.demo.services.UserInfoService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserInfoService service; 
  
    @Autowired
    private JwtService jwtService; 
  
    @Autowired
    private AuthenticationManager authenticationManager; 

    @PostMapping("/register") 
    public Map<String, String> addNewUser(@RequestBody UserInfo userInfo) { 
        HashMap<String, String> map = new HashMap<>();
        try {
            map.put("message", service.addUser(userInfo));
            return map; 
        } catch (Exception e) {
            map.put("message", e.toString());
        }
        return map;
    }
    
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())); 
        if (authentication.isAuthenticated()) { 
            HashMap<String, String> map = new HashMap<>();
            map.put("token", jwtService.generateToken(authRequest.getUsername()));
            return map; 
        } else { 
            throw new UsernameNotFoundException("invalid user request !"); 
        }
    }
}
