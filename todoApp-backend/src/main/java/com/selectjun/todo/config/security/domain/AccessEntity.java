package com.selectjun.todo.config.security.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.validator.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccessEntity {

    /**
     * 회원 구별 정보(아이디)
     */
    @NotBlank(message = "아이디를 입력해주세요")
    private String id;

    /**
     * 회원 암호
     */
    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;

}
