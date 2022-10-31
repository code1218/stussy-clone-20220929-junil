package com.stussy.stussyclone20220929junil.controller.api;


import com.stussy.stussyclone20220929junil.dto.CMRespDto;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Date;

@RestController
@RequestMapping("/api/auth")
public class JWTApi {

    @PostMapping("/jwt")
    public ResponseEntity<?> createJwt() {
        Date now = new Date();

        String jwt = Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer("junil") //발급자(iss)
                .setIssuedAt(now) //발급 시간
                .setExpiration(new Date(now.getTime() + Duration.ofMinutes(30).toMillis())) //만료 시간
                .claim("username", "junil")
                .claim("email", "junil@gmail.com")
                .signWith(SignatureAlgorithm.HS256, "1234")
                .compact();

        jwt = "Bearer " + jwt;

        return ResponseEntity.ok(new CMRespDto<>(1, "juw created", jwt));
    }

}
