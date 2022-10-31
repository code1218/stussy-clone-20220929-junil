package com.stussy.stussyclone20220929junil.controller.api;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class JWTApi {

    public ResponseEntity<?> getPrincipal() {

        return ResponseEntity.ok(null);
    }

}
