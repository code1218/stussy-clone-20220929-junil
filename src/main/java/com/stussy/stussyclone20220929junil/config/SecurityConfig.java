package com.stussy.stussyclone20220929junil.config;

import com.stussy.stussyclone20220929junil.handler.auth.AuthFailureHandler;
import com.stussy.stussyclone20220929junil.service.auth.PrincipalOauth2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@EnableWebSecurity // 기존의 WebSecurityConfigurerAdapter 클래스를 해당 SecurityConfig로 대체하겠다.
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final PrincipalOauth2Service principalOauth2Service;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.httpBasic().disable();
        http.authorizeRequests() //모든 요청시에 실행을 해라

                /*<<<<<<<<<<<<<<<<<< Page >>>>>>>>>>>>>>>>*/
                .antMatchers("/admin/**", "/api/admin/**")
                .access("hasRole('ADMIN') or hasRole('MANAGER')")
                .antMatchers("/account", "/order/**") //해당 요청 주소들은
                .access("hasRole('USER') or hasRole('ADMIN') or hasRole('MANAGER')")

                .antMatchers("/", "/index", "/collections/**")
                .permitAll()
                .antMatchers("/account/login", "/account/register")
                .permitAll()

                /*<<<<<<<<<<<<<<<<<< Resource >>>>>>>>>>>>>>>>*/
                .antMatchers("/static/**", "/image/**")
                .permitAll() //모두 접근 권한을 허용해라.

                /*<<<<<<<<<<<<<<<<<< API >>>>>>>>>>>>>>>>*/
                .antMatchers("/api/account/register", "/api/collections/**", "/api/auth/**")
                .permitAll()

                .anyRequest() //antMatchers 외에 다른 모든 요청들은
                .permitAll()
//                .denyAll() //모든 접근을 차단해라.

                .and()
                .formLogin() //폼로그인 방식으로 인증을 해라
                .usernameParameter("email")
                .loginPage("/account/login") //우리가 만든 로그인 페이지를 사용해라. GET 요청
                .loginProcessingUrl("/account/login")   // 로그인 로직(PrincipalDetailsService) POST 요청
                .failureHandler(new AuthFailureHandler())
                .and()
                .oauth2Login()
                .userInfoEndpoint()
                /*
                 * 1. google, naver, kakao 로그인 요청 -> 코드를 발급(토큰)
                 * 2. 발급받은 코드로 에세스토큰을 발급요청 -> 에세스토큰 발급
                 * 3. 발급받은 에세스토큰으로 스코프에 등록된 프로필 정보를 요청할 수 있게된다.
                 * 4. 해당 정보를 response또는 Attributes로 전달 받음
                 */
                .userService(principalOauth2Service)

                .and()
                .defaultSuccessUrl("/index");

    }

}
