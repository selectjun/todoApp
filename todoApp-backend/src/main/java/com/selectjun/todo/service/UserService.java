package com.selectjun.todo.service;

import com.selectjun.todo.domain.UserEntity;
import com.selectjun.todo.mapper.UserAuthorityMapper;
import com.selectjun.todo.mapper.UserMapper;
import com.selectjun.todo.util.cryption.Aes256;
import com.selectjun.todo.util.cryption.Sha256;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
public class UserService {

    /**
     * User Mapper
     */
    private final UserMapper userMapper;

    /**
     * User Authority Mapper
     */
    private final UserAuthorityMapper userAuthorityMapper;

    /**
     * SHA-256 Cryption Component
     */
    private final Sha256 sha256;

    /**
     * AES-256 Cryption Component
     */
    private final Aes256 aes256;

    /**
     * 회원 중복 확인
     * @param id    회원 구별 정보(아이디)
     * @return      중복 여부(true: 중복, false: 미중복)
     */
    public Boolean duplicate(String id) {
        if (userMapper.countById(id) < 1) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 회원 가입
     * @param userEntity    회원 정보
     * @return              회원 구별 정보(아이디)
     */
    public String join(UserEntity userEntity) throws NoSuchAlgorithmException {
        // 패스워드 암호화
        userEntity.setPassword(sha256.encryption(userEntity.getPassword()));

        userMapper.save(userEntity.toEncryptionEntity(aes256));
        userAuthorityMapper.save(userEntity.getId());

        return userEntity.getId();
    }

}
