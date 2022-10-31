package com.stussy.stussyclone20220929junil.config;

import com.stussy.stussyclone20220929junil.filter.JWTFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean filter1() {
        FilterRegistrationBean reg = new FilterRegistrationBean(new JWTFilter());
        reg.setOrder(Integer.MIN_VALUE);
        reg.addUrlPatterns("/*");
        return reg;
    }
}
