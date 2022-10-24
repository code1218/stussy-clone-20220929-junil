package com.stussy.stussyclone20220929junil.config;

import com.stussy.stussyclone20220929junil.handler.auth.AuthFailureHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableWebSecurity // 기존의 WebSecurityConfigurerAdapter 클래스를 해당 SecurityConfig로 대체하겠다.
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

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
                .antMatchers("/account") //해당 요청 주소들은
                .access("hasRole('USER') or hasRole('ADMIN') or hasRole('MANAGER')")

                .antMatchers("/", "/index", "/collections/**")
                .permitAll()
                .antMatchers("/account/login", "/account/register")
                .permitAll()

                /*<<<<<<<<<<<<<<<<<< Resource >>>>>>>>>>>>>>>>*/
                .antMatchers("/static/**", "/image/**")
                .permitAll() //모두 접근 권한을 허용해라.

                /*<<<<<<<<<<<<<<<<<< API >>>>>>>>>>>>>>>>*/
                .antMatchers("/api/account/register", "/api/collections/**")
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
                .defaultSuccessUrl("/index");

    }

}
