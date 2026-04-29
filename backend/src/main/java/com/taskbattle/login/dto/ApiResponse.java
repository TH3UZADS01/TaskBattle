package com.taskbattle.login.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO para respostas de API.
 * Utilizado para retornar mensagens de sucesso ou erro.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {
    
    /**
     * Indica se a operação foi bem-sucedida.
     */
    private boolean success;
    
    /**
     * Mensagem descritiva do resultado.
     */
    private String message;
    
    /**
     * Dados opcionais a serem retornados (pode ser null).
     */
    private Object data;
    
    /**
     * Cria uma resposta de sucesso.
     * @param message Mensagem de sucesso.
     * @return ApiResponse com success = true.
     */
    public static ApiResponse success(String message) {
        return new ApiResponse(true, message, null);
    }
    
    /**
     * Cria uma resposta de sucesso com dados.
     * @param message Mensagem de sucesso.
     * @param data Dados a serem retornados.
     * @return ApiResponse com success = true e dados.
     */
    public static ApiResponse success(String message, Object data) {
        return new ApiResponse(true, message, data);
    }
    
    /**
     * Cria uma resposta de erro.
     * @param message Mensagem de erro.
     * @return ApiResponse com success = false.
     */
    public static ApiResponse error(String message) {
        return new ApiResponse(false, message, null);
    }
}