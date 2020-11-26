package com.selectjun.todo.config.security.service;

import com.selectjun.todo.util.cryption.Sha256;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
public class CustomPasswordEncoder implements PasswordEncoder {

    /**
     * 암호화
     * @param rawPassword   원복 암호
     * @return              암호화된 암호
     */
    @Override
    @SneakyThrows
    public String encode(CharSequence rawPassword) {
        return Sha256.encryption((String) rawPassword);
    }

    /**
     * 암호 일치 여부 확인
     * @param rawPassword       사용자 입력 암호
     * @param encodedPassword   비교 대상
     * @return                  일치 여부
     */
    @Override
    @SneakyThrows
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return encodedPassword.equals(Sha256.encryption((String) rawPassword));
    }

}
