package com.stussy.stussyclone20220929junil.controller.api;

import com.stussy.stussyclone20220929junil.aop.annotation.LogAspect;
import com.stussy.stussyclone20220929junil.aop.annotation.ValidAspect;
import com.stussy.stussyclone20220929junil.dto.CMRespDto;
import com.stussy.stussyclone20220929junil.dto.account.RegisterReqDto;
import com.stussy.stussyclone20220929junil.dto.validation.ValidationSequence;
import com.stussy.stussyclone20220929junil.service.AccountService;
import com.stussy.stussyclone20220929junil.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.StopWatch;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequestMapping("/api/account")
@RestController
@RequiredArgsConstructor
public class AccountApi {

    private final AccountService accountService;

    @LogAspect
    @ValidAspect
    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated(ValidationSequence.class) @RequestBody RegisterReqDto registerReqDto, BindingResult bindingResult) throws Exception {

        accountService.checkDuplicateEmail(registerReqDto.getEmail());
        accountService.register(registerReqDto);

        return ResponseEntity.ok().body(new CMRespDto<>(1, "Successfully registered", registerReqDto));
    }

    @GetMapping("/principal")
    public ResponseEntity<?> getPrincipal(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        new BCryptPasswordEncoder().matches(principalDetails.getPassword(), "1234");
        return ResponseEntity.ok().body(new CMRespDto<>(1, "principalDetails", principalDetails == null ? "" : principalDetails));
    }

}
