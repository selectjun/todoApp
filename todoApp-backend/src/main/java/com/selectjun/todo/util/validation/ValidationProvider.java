package com.selectjun.todo.util.validation;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import java.util.HashMap;
import java.util.Map;

@Component
public class ValidationProvider {

    public ResponseEntity valid(Errors errors) {
        Map<String, Object> error = new HashMap<>();
        error.put("success", false);
        error.put("data", errors.getFieldError().getField());
        error.put("message", errors.getFieldError().getDefaultMessage());
        return ResponseEntity.badRequest().body(error);
    }

}
