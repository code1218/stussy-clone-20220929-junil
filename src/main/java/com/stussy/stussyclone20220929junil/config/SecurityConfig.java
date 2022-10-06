package com.stussy.stussyclone20220929junil.config;

import com.stussy.stussyclone20220929junil.service.PrincipalDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity // 기존의 WebSecurityConfigurerAdapter 클래스를 해당 SecurityConfig로 대체하겠다.
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.httpBasic().disable();
        http.authorizeRequests() //모든 요청시에 실행을 해라
                .antMatchers("/test/**", "/index") //해당 요청 주소들은
                .authenticated() //인증이 필요하다.
                .anyRequest() //antMatchers 외에 다른 모든 요청들은
                .permitAll() //모두 접근 권한을 허용해라.
                .and()
                .formLogin() //폼로그인 방식으로 인증을 해라
                .usernameParameter("email")
                .loginPage("/account/login") //우리가 만든 로그인 페이지를 사용해라. GET 요청
                .loginProcessingUrl("/account/login")   // 로그인 로직(PrincipalDetailsService) POST 요청
                .defaultSuccessUrl("/index");

    }

}
