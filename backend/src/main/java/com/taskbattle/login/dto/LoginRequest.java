package com.taskbattle.login.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO para requisições de login.
 * Contém username e password para autenticação.
 */
@Data
public class LoginRequest {
    
    /**
     * Nome de usuário.
     * Não pode estar em branco.
     */
    @NotBlank(message = "Username é obrigatório")
    private String username;
    
    /**
     * Senha do usuário.
     * Não pode estar em branco e deve ter no mínimo 6 caracteres.
     */
    @NotBlank(message = "Password é obrigatório")
    @Size(min = 6, message = "Password deve ter pelo menos 6 caracteres")
    private String password;
}