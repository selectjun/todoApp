package com.selectjun.todo.controller;

import com.selectjun.todo.config.security.service.JwtTokenProvider;
import com.selectjun.todo.domain.TodoEntity;
import com.selectjun.todo.service.TodoService;
import com.selectjun.todo.util.validation.ValidationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/todo")
public class TodoController {

    /**
     * TodoService
     */
    private final TodoService todoService;

    /**
     * Validation Component
     */
    private final ValidationProvider validationProvider;

    /**
     * JWT Component
     */
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * To Do 추가
     * @param todoEntity    To Do 정보
     * @param errors        유효성 객체
     * @return              성공 여부
     */
    @PostMapping("/")
    public ResponseEntity insertTodo(@Valid TodoEntity todoEntity
                                     , Errors errors, HttpServletRequest request) {
        Map<String, Object> response = new HashMap<String, Object>();
        
        // 유효성 체크
        if (errors.hasErrors()) {
            return validationProvider.valid(errors);
        }

        // 사용자 ID 가져오기
        String token = jwtTokenProvider.resolveToken(request);
        String id = jwtTokenProvider.getUserPk(token);
        todoEntity.setId(id);

        Long todoId = todoService.insert(todoEntity);

        if (todoId == null) {
            response.put("success", false);
            response.put("message", "등록하는 중, 에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

        response.put("success", true);
        response.put("todoId", todoId);

        return ResponseEntity.ok().body(response);
    }

    /**
     * To Do 목록 가져오기
     * @return  To Do 목록
     */
    @GetMapping("/")
    public ResponseEntity getTodoList() {
        Map<String, Object> response = new HashMap<String, Object>();

        List<TodoEntity> todoEntityList = todoService.getTodoList();

        if (todoEntityList == null) {
            response.put("success", false);
            response.put("message", "등록하는 중, 에러가 발생하였습니다");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

        response.put("success", true);
        response.put("todoList", todoEntityList);

        return ResponseEntity.ok().body(response);
    }

    /**
     * To Do 가져오기
     * @param todoId    todoId(PK)
     * @return          To Do
     */
    @GetMapping("/{todoId}/")
    public ResponseEntity getTodo(@PathVariable Long todoId) {
        Map<String, Object> response = new HashMap<String, Object>();

        if (todoId == null) {
            response.put("success", false);
            response.put("message", "[todoId]를 입력하지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }

        TodoEntity todoEntity = todoService.getTodo(todoId);
        if (todoEntity == null) {
            response.put("success", true);
            response.put("message", "데이터가 존재하지 않습니다");
            return ResponseEntity.ok().body(response);
        }

        response.put("success", true);
        response.put("todo", todoEntity);

        return ResponseEntity.ok().body(response);
    }

    /**
     * To Do 수정
     * @param todoEntity    To Do 정보
     * @param errors        유효성 객체
     * @param request       요청 객체
     * @return              성공 여부
     */
    @PutMapping("/")
    public ResponseEntity updateTodo(@Valid TodoEntity todoEntity, Errors errors
                            , HttpServletRequest request) {
        Map<String, Object> response = new HashMap<String, Object>();

        // 유효성 체크
        if (errors.hasErrors()) {
            return validationProvider.valid(errors);
        }

        if (todoEntity.getTodoId() == null) {
            response.put("success", false);
            response.put("message", "[todoId]를 입력하지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }

        String token = jwtTokenProvider.resolveToken(request);
        String id = jwtTokenProvider.getUserPk(token);
        todoEntity.setId(id);

        try {
            todoService.updateTodo(todoEntity);
            response.put("success", true);
            response.put("message", "수정되었습니다");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "수정하던 중 에러가 발생하였습니다");
        }

        return ResponseEntity.ok().body(response);
    }

    /**
     * To Do 삭제
     * @param todoId    todoId(PK)
     * @return          성공 여부
     */
    @PutMapping("/{todoId}/delete/")
    public ResponseEntity deleteTodo(@PathVariable Long todoId) {
        Map<String, Object> response = new HashMap<String, Object>();

        if (todoId == null) {
            response.put("success", false);
            response.put("message", "[todoId]를 입력하지 않습니다");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            todoService.deleteTodo(todoId);
            response.put("success", true);
            response.put("message", "삭제되었습니다");
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "삭제하던 중 에러가 발생하였습니다");
        }

        return ResponseEntity.ok().body(response);
    }

}
