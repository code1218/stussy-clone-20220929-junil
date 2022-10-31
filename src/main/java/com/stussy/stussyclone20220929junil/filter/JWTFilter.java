package com.stussy.stussyclone20220929junil.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpHeaders;

import javax.servlet.*;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTFilter extends HttpFilter {

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        if(!request.getRequestURI().contains("/api/auth/jwt") && !request.getRequestURI().contains("/static")){
            String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
            Claims claims = parseJwtToken(authorization);
            System.out.println(claims.get("username"));
            System.out.println(claims.get("email"));
        }

        super.doFilter(request, response, chain);

    }

    public Claims parseJwtToken(String authorization) {
        validationAuthorizationHeader(authorization);
        String jwtToken = extractToken(authorization);
        System.out.println(jwtToken);

        return Jwts.parser()
                .setSigningKey("1234")
                .parseClaimsJwt(jwtToken)
                .getBody();
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

