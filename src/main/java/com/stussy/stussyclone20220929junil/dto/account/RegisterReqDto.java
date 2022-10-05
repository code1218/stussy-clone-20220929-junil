package com.stussy.stussyclone20220929junil.dto.account;

import com.stussy.stussyclone20220929junil.dto.validation.ValidationGroups;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class RegisterReqDto {

    @Pattern(regexp = "^[가-힇]{1,3}$",
            message = "이름은 한글만 입력가능하며 한글자 이상 세글자 이하로 작성하세요.",
            groups = ValidationGroups.PatternCheckGroup.class
    )
    private String lastName;

    @Pattern(regexp = "^[가-힇]{1,2}$",
            message = "성은 한글만 입력가능하며 한글자 이상 두글자 이하로 작성하세요.",
            groups = ValidationGroups.PatternCheckGroup.class
    )
    private String firstName;

    @Email
    @NotBlank(message = "이메일은 비워 둘 수 없습니다.")
    private String email;

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*_])[a-zA-Z\\d-~!@#$%^&*_]{8,16}$",
            message = "비밀번호는 숫자, 영문(대소문자), 특수기호를 하나 이상 포함하여야하며 8자 이상 16자 이하로 작성해야합니다.",
            groups = ValidationGroups.PatternCheckGroup.class
    )
    @NotBlank(message = "비밀번호는 비워 둘 수 없습니다.", groups = ValidationGroups.NotBlankGroup.class)
    private String password;
}
