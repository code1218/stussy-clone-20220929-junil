package com.stussy.stussyclone20220929junil.service;

import com.stussy.stussyclone20220929junil.domain.User;
import com.stussy.stussyclone20220929junil.exception.CustomValidationException;
import com.stussy.stussyclone20220929junil.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{

    private final AccountRepository accountRepository;

    @Override
    public boolean checkDuplicateEmail(String email) {

        User user = accountRepository.findUserByEmail(email);
        if(user != null) {
            Map<String, String> errorMap = new HashMap<String, String>();
            errorMap.put("duplicateFlag", "이미 가입된 이메일입니다");
            throw new CustomValidationException("DuplicateEmail Error", errorMap);
        }

        return true;
    }

}
