package com.selectjun.todo.config.security.service;

import com.selectjun.todo.config.security.domain.CertificationEntity;
import com.selectjun.todo.config.security.mapper.CertificationAuthorityMapper;
import com.selectjun.todo.config.security.mapper.CertificationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    /**
     * Certification Mapper
     */
    private final CertificationMapper certificationMapper;

    /**
     * Certification Authority Mapper
     */
    private final CertificationAuthorityMapper certificationAuthorityMapper;

    /**
     * 회원 조회
     * @param username  회원 구별 정보(아이디)
     * @return          회원 조획 결과
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        CertificationEntity certificationEntity = certificationMapper.getUser(username);
        certificationEntity.setRoles(certificationAuthorityMapper.getUserAuthority(username));
        return certificationEntity;
    }

}
