-- Script SQL para criação do banco de dados e tabela de usuários
-- MySQL 8.0+

-- Criar banco de dados se não existir
CREATE DATABASE IF NOT EXISTS taskbattle;
USE taskbattle;

-- Criar tabela users
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Índices para melhorar performance nas buscas
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserir usuário de teste
-- Senha: "teste123" (criptografada com BCrypt)
-- Para gerar novas senhas BCrypt, pode usar: https://bcrypt.online/
INSERT INTO users (username, email, password) VALUES 
('teste_user', 'teste@taskbattle.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

-- Verificar inserção
SELECT id, username, email, password, created_at FROM users;