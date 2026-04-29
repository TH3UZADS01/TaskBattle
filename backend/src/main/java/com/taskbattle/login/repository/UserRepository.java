package com.taskbattle.login.repository;

import com.taskbattle.login.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repositório para operações de acesso a dados da entidade User.
 * Extende JpaRepository para herdar operações CRUD básicas.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Busca um usuário pelo username.
     * @param username Nome de usuário a ser buscado.
     * @return Optional contendo o usuário se encontrado.
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Busca um usuário pelo email.
     * @param email Email a ser buscado.
     * @return Optional contendo o usuário se encontrado.
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Verifica se existe um usuário com o username informado.
     * @param username Nome de usuário a verificar.
     * @return true se existir, false caso contrário.
     */
    boolean existsByUsername(String username);
    
    /**
     * Verifica se existe um usuário com o email informado.
     * @param email Email a verificar.
     * @return true se existir, false caso contrário.
     */
    boolean existsByEmail(String email);
}