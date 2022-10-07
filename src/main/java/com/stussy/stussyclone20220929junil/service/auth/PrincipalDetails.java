package com.stussy.stussyclone20220929junil.service.auth;

import com.stussy.stussyclone20220929junil.domain.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Getter
public class PrincipalDetails implements UserDetails {

    private User user;

    public PrincipalDetails(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(() -> user.getRole().getRole());

        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {  // 계정의 만료 여부(계정의 사용기간 만료)
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {   // 계정의 잠김 여부(관리자가 강제로 사용을 금함)
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {  // 비밀번호 만료 여부(비밀번호 5회이상 틀렸을 때)
        return true;
    }

    @Override
    public boolean isEnabled() {    // 계정의 활성화 여부(휴먼 계정, 이메일 또는 전화번호 인증 필요)
        return true;
    }
}
