package com.selectjun.todo.mapper;

import com.selectjun.todo.domain.TodoEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TodoMapper {

    /**
     * To Do 저장
     * @param todoEntity    To Do 정보
     */
    public void insertTodo(TodoEntity todoEntity);

    /**
     * To Do 목록 가져오기
     * @return  To Do 목록
     */
    public List<TodoEntity> getTodoList();

    /**
     * To Do 가져오기
     * @param todoId    todoId(PK)
     * @return          To Do
     */
    public TodoEntity getTodo(Long todoId);

    /**
     * To Do 수정
     * @param todoEntity    To Do 정보
     */
    public void updateTodo(TodoEntity todoEntity);

    /**
     * To Do 삭제
     * @param todoId    todoId(PK)
     */
    public void deleteTodo(Long todoId);

}
