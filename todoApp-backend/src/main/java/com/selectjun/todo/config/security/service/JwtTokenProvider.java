package com.selectjun.todo.config.security.service;

import com.selectjun.todo.config.security.domain.CertificationEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@RequiredArgsConstructor
@Component
public class JwtTokenProvider {

    /**
     * JWT 비밀키
     */
    @Value("spring.jwt.secret")
    private String secretKey;

    /**
     * UserDetailsService
     */
    private final UserDetailsService userDetailsService;

    /**
     * 토큰 유효시간
     */
    private final Long tokenValidMillisecond = 1000L * 60 * 60;

    /**
     * JWT 비밀키 암호화
     */
    @PostConstruct
    public void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    /**
     * JWT Token 생성
     * @param userPk    회원 구별 정보(아이디)
     * @param roles     회원 권한
     * @return          토큰
     */
    public String createToken(String userPk, List<String> roles) {
        Claims claims = Jwts.claims().setSubject(userPk);
        claims.put("roles", roles);
        Date now = new Date();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + tokenValidMillisecond))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /**
     * 인증
     * @param token 토큰
     * @return      인증 결과
     */
    public Authentication getAuthentication(String token) {
        CertificationEntity certificationEntity = (CertificationEntity) userDetailsService.loadUserByUsername(this.getUserPk(token));
        return new UsernamePasswordAuthenticationToken(certificationEntity, "", certificationEntity.getAuthorities());
    }

    /**
     * 회원 구별 정보(아이디) 추출
     * @param token 토큰
     * @return      회원 구별 정보(아이디)
     */
    public String getUserPk(String token) {
        return  Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * Header에서 Token 파싱
     * @param request   요청 객체
     * @return          토큰
     */
    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }

    /**
     * Token 유효성 및 만료 일자 확인
     * @param token 토큰
     * @return      유효성 여부
     */
    public boolean validToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return !claimsJws.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }

}
