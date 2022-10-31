package com.stussy.stussyclone20220929junil.filter;

import io.jsonwebtoken.Claims;
import org.springframework.http.HttpHeaders;

import javax.servlet.*;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTFilter extends HttpFilter {

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        // Claims claims =

        super.doFilter(request, response, chain);

    }

    private void validationAuthorizationHeader(String header) {
        if(header == null || !header.startsWith("Bearer ")) {
            throw new IllegalArgumentException();
        }
    }

    private String extractToken(String authorization) {
        return authorization.substring("Bearer ".length());
    }
}

