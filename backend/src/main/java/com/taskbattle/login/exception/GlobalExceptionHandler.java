package com.taskbattle.login.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.taskbattle.login.dto.ApiResponse;

import java.util.HashMap;
import java.util.Map;

/**
 * Handler global de exceções.
 * Captura erros não tratados e retorna respostas JSON padronizadas.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    /**
     * Tratamento para erros de validação do Spring.
     * @param ex Exceção de validação.
     * @return ResponseEntity com erros de validação.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.error("Erro de validação: " + errors));
    }
    
    /**
     * Tratamento genérico para outras exceções.
     * @param ex Exceção genérica.
     * @return ResponseEntity com mensagem de erro.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Erro interno: " + ex.getMessage()));
    }
}