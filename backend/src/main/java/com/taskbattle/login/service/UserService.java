package com.taskbattle.login.service;

import com.taskbattle.login.dto.LoginRequest;
import com.taskbattle.login.dto.RegisterRequest;
import com.taskbattle.login.entity.User;
import com.taskbattle.login.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Service responsável pela lógica de negócio relacionada a usuários.
 * Handles operações de login, registro e validação de usuários.
 */
@Service
public class UserService {
    
    /**
     * Repositório de usuários injetado via construtor.
     */
    private final UserRepository userRepository;
    
    /**
     * Codificador de senhas BCrypt.
     */
    private final BCryptPasswordEncoder passwordEncoder;
    
    /**
     * Construtor com injeção de dependências.
     * @param userRepository Repositório de usuários.
     */
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }
    
    /**
     * Autentica um usuário com username e password.
     * @param request Dados de login (username e password).
     * @return Map com token simulado e dados do usuário se autenticado com sucesso.
     * @throws Exception Se usuário não encontrado ou senha inválida.
     */
    public Map<String, Object> login(LoginRequest request) throws Exception {
        // Busca usuário pelo username
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new Exception("Usuário não encontrado"));
        
        // Verifica se a senha está correta
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new Exception("Senha inválida");
        }
        
        // Retorna dados do usuário (em produção, geraria um JWT real)
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login realizado com sucesso");
        response.put("userId", user.getId());
        response.put("username", user.getUsername());
        response.put("email", user.getEmail());
        response.put("token", "token-simulado-" + user.getId()); // Substituir por JWT real em produção
        
        return response;
    }
    
    /**
     * Registra um novo usuário no sistema.
     * @param request Dados de registro (username, email, password).
     * @return Map com dados do usuário criado.
     * @throws Exception Se username ou email já existem.
     */
    public Map<String, Object> register(RegisterRequest request) throws Exception {
        // Verifica se username já existe
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new Exception("Username já está em uso");
        }
        
        // Verifica se email já existe
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new Exception("Email já está em uso");
        }
        
        // Cria novo usuário
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        
        // Criptografa a senha antes de salvar
        String encryptedPassword = passwordEncoder.encode(request.getPassword());
        newUser.setPassword(encryptedPassword);
        
        // Salva o usuário no banco de dados
        User savedUser = userRepository.save(newUser);
        
        // Retorna dados do usuário criado
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Usuário cadastrado com sucesso");
        response.put("userId", savedUser.getId());
        response.put("username", savedUser.getUsername());
        response.put("email", savedUser.getEmail());
        
        return response;
    }
}