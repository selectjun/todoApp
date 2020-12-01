package com.selectjun.todo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthCheckController {

    /**
     * 시스템 정상 확인
     * @return  시스템 정상 여부
     */
    @GetMapping("/healthCheck/")
    public Map<String, Object> healthCheck() {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("status", "200");
        return response;
    }

}
