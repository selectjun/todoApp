package com.selectjun.todo.domain;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TimeEntity {

    /**
     * 생성일자
     */
    private LocalDateTime createAt;

    /**
     * 수정일자
     */
    private LocalDateTime updateAt;

}
