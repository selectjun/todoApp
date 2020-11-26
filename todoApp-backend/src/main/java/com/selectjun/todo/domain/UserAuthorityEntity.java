package com.selectjun.todo.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAuthorityEntity {

    /**
     * USER_AUTHORITY 구별 정보(PK)
     */
    private Long authorityId;

    /**
     * 회원 구별 정보(아이디)
     */
    private String id;

    /**
     * 회원 권한
     */
    private String authority;

}
