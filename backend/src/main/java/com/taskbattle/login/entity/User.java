package com.taskbattle.login.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidade que representa um usuário no sistema.
 * Mapeada para a tabela "users" no banco de dados MySQL.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    /**
     * Identificador único do usuário (chave primária).
     * Gerado automaticamente pelo banco de dados.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    /**
     * Nome de usuário único.
     * Não pode ser nulo e deve ter no máximo 50 caracteres.
     */
    @Column(nullable = false, unique = true, length = 50)
    private String username;
    
    /**
     * Email único do usuário.
     * Não pode ser nulo e deve ter no máximo 100 caracteres.
     */
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    /**
     * Senha do usuário (armazenada criptografada com BCrypt).
     * Não pode ser nula.
     */
    @Column(nullable = false)
    private String password;
}