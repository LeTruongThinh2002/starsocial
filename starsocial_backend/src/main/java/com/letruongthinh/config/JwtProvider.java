package com.letruongthinh.config;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;

import com.letruongthinh.models.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {
    private static SecretKey key=Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
    private static SecretKey keyFgPwd=Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY_FORGOT_PASSWORD.getBytes());


    public static String generateToken(Authentication auth ){
        String jwt = Jwts.builder()
                    .setIssuer("Error token").setIssuedAt(new Date())
                    .setExpiration(new Date(new Date().getTime()+86400000))
                    .claim("email", auth.getName())
                    .signWith(key)
                    .compact();
        return jwt;
    }

    public static String generateTokenFgPwd(User user){
        String jwt = Jwts.builder()
                    .setIssuer("Error token").setIssuedAt(new Date())
                    .setExpiration(new Date(new Date().getTime()+600000))
                    .claim("email", user.getEmail())
                    .signWith(keyFgPwd)
                    .compact();
        return jwt;
    }

    public static String getEmailFromJwtToken(String jwt){
        // Bearer token
        jwt=jwt.substring(7);

        Claims claims=Jwts.parser()
                        .setSigningKey(key).build().parseClaimsJws(jwt).getBody();
        
        String email=String.valueOf(claims.get("email"));
        return email;
    }

    public static String getEmailFromJwtFgPwdToken(String jwt){
        try {
        Claims claims=Jwts.parser()
                        .setSigningKey(keyFgPwd).build().parseClaimsJws(jwt).getBody();
        
        String email=String.valueOf(claims.get("email"));
        return email;
        } catch (ExpiredJwtException ex) {
            String expiredMessage = String.format("Expired token, please send the request to forget the password!");
            return expiredMessage;
        } catch (Exception e) {
            // Xử lý các ngoại lệ khác khi giải mã JWT thất bại
            return "Failed to parse JWT: " + e.getMessage();
        }
    }
}
