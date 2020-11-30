package com.selectjun.todo.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TodoEntity extends TimeEntity {

    /**
     * TODO_ID(PK)
     */
    @NotNull
    private Long todoId;

    /**
     * 제목
     */
    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    /**
     * 내용
     */
    private String content;

    /**
     * 시작일
     */
    private LocalDateTime startDate;

    /**
     * 종료일
     */
    private LocalDateTime endDate;

    /**
     * 등록자(FK)
     */
    @NotBlank(message = "등록자를 입력해주세요")
    private String id;

    /**
     * 완료 여부
     */
    @Builder.Default
    private Boolean isComplete = false;

    /**
     * 삭제 여부
     */
    @Builder.Default
    private Boolean isDelete = false;

}
