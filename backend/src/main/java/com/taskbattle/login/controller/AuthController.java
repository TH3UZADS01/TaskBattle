package com.taskbattle.login.controller;

import com.taskbattle.login.dto.ApiResponse;
import com.taskbattle.login.dto.LoginRequest;
import com.taskbattle.login.dto.RegisterRequest;
import com.taskbattle.login.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller responsável por lidar com requisições relacionadas a autenticação.
 * Endpoints: POST /login e POST /register
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Permite requisições de qualquer origem (em produção, limitar aos domínios permitidos)
public class AuthController {
    
    /**
     * Service de usuários injetado via construtor.
     */
    private final UserService userService;
    
    /**
     * Construtor com injeção de dependência.
     * @param userService Service de usuários.
     */
    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    
    /**
     * Endpoint para autenticação de usuários.
     * POST /api/auth/login
     * 
     * @param request Dados de login (username e password).
     * @return ResponseEntity com resultado da autenticação.
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            Map<String, Object> result = userService.login(request);
            return ResponseEntity.ok(ApiResponse.success(
                    (String) result.get("message"), 
                    result
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
    
    /**
     * Endpoint para registro de novos usuários.
     * POST /api/auth/register
     * 
     * @param request Dados de registro (username, email, password).
     * @return ResponseEntity com resultado do cadastro.
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            Map<String, Object> result = userService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(
                            (String) result.get("message"), 
                            result
                    ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }
}