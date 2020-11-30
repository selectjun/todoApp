package com.selectjun.todo.service;

import com.selectjun.todo.domain.TodoEntity;
import com.selectjun.todo.mapper.TodoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    /**
     * TodoMapper
     */
    private final TodoMapper todoMapper;


    /**
     * To Do 추가
     * @param todoEntity    To Do 정보
     * @return              todoId(PK)
     */
    public Long insert(TodoEntity todoEntity) {
        todoMapper.insertTodo(todoEntity);

        return todoEntity.getTodoId();
    }

    /**
     * To Do 목록 가져오기
     * @return
     */
    public List<TodoEntity> getTodoList() {
        return todoMapper.getTodoList();
    }

    /**
     * To Do 가져오기
     * @param todoId
     * @return
     */
    public TodoEntity getTodo(Long todoId) {
        return todoMapper.getTodo(todoId);
    }

    /**
     * To Do 수정
     * @param todoEntity
     */
    public void updateTodo(TodoEntity todoEntity) {
        todoMapper.updateTodo(todoEntity);
    }

    /**
     * To Do 삭제
     * @param todoId
     */
    public void deleteTodo(Long todoId) {
        todoMapper.deleteTodo(todoId);
    }

}
