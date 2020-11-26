package com.selectjun.todo.config.security.domain;

import lombok.Data;

@Data
public class CertificationAuthorityEntity {

    /**
     * 회원 권한 아이디(PK)
     */
    private String authorityId;

    /**
     * 회원 구별 정보(아이디)
     */
    private String id;

    /**
     * 회원 권한
     */
    private String authority;

}
