package com.taskbattle.login.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO para requisições de registro/cadastro de novos usuários.
 * Contém username, email e password para criação de conta.
 */
@Data
public class RegisterRequest {
    
    /**
     * Nome de usuário único.
     * Não pode estar em branco e deve ter entre 3 e 50 caracteres.
     */
    @NotBlank(message = "Username é obrigatório")
    @Size(min = 3, max = 50, message = "Username deve ter entre 3 e 50 caracteres")
    private String username;
    
    /**
     * Email único do usuário.
     * Não pode estar em branco e deve ser um email válido.
     */
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ser válido")
    private String email;
    
    /**
     * Senha do usuário.
     * Não pode estar em branco e deve ter no mínimo 6 caracteres.
     */
    @NotBlank(message = "Password é obrigatório")
    @Size(min = 6, message = "Password deve ter pelo menos 6 caracteres")
    private String password;
}