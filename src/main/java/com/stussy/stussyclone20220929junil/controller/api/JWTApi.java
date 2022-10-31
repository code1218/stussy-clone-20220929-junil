package com.stussy.stussyclone20220929junil.controller.api;


import com.stussy.stussyclone20220929junil.dto.CMRespDto;
import com.stussy.stussyclone20220929junil.util.JwtProvider;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.Date;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class JWTApi {

    private final JwtProvider jwtProvider;

    @PostMapping("/jwt/{username}")
    public ResponseEntity<?> createJwt(@PathVariable String username) {

        String token = jwtProvider.createToken(username);
        Claims claims = jwtProvider.parseJwtToken(token);

        return ResponseEntity.ok(new CMRespDto<>(1, "jwt created", token));
    }

    @GetMapping("/jwt")
    public ResponseEntity<?> checkToken(@RequestHeader(value = HttpHeaders.AUTHORIZATION) String token) {
        Claims claims = jwtProvider.parseJwtToken(token);
        return ResponseEntity.ok(new CMRespDto<>(1, "검증완료", token));
    }

}
