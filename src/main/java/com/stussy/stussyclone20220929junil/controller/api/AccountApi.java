package com.stussy.stussyclone20220929junil.controller.api;

import com.stussy.stussyclone20220929junil.dto.account.RegisterReqDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/api/account")
@RestController
public class AccountApi {

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterReqDto registerReqDto) {

        log.info("{}", registerReqDto);

        return ResponseEntity.ok(null);
    }

}
