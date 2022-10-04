package com.stussy.stussyclone20220929junil.dto.account;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Data
public class RegisterReqDto {

    @Pattern(regexp = "^[가-힇]{1,3}$", message = "이름은 한글만 입력가능하며 한글자 이상 세글자 이하로 작성하세요.")
    private String lastName;

    @Pattern(regexp = "^[가-힇]{1,2}$", message = "성은 한글만 입력가능하며 한글자 이상 두글자 이하로 작성하세요.")
    private String firstName;

    @Email(message = "잘 못 된 이메일 형식입니다.")
    private String email;

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*_])[a-zA-Z\\d-~!@#$%^&*_]{8,16}$")
    private String password;
}
