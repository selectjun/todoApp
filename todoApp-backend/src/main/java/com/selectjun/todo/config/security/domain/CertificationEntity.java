package com.selectjun.todo.config.security.domain;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CertificationEntity implements UserDetails {

    /**
     * 회원 구별 정보(아이디)
     */
    private String id;

    /**
     * 회원 암호
     */
    private String password;

    /**
     * 회원 이름
     */
    private String name;

    /**
     * 회원 이메일
     */
    private String email;

    /**
     * 등록일자
     */
    private LocalDateTime createAt;

    /**
     * 수정일자
     */
    private LocalDateTime updateAt;

    /**
     * 회원 권한
     */
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return id;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }

}
