-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS wallet;
USE wallet;

-- Tabla 'payments'
CREATE TABLE IF NOT EXISTS payments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    document INT NOT NULL,
    amount FLOAT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    token INT NOT NULL,
    created_at VARCHAR(255) NOT NULL
);

-- Tabla 'wallet'
CREATE TABLE IF NOT EXISTS wallet (
    id INT PRIMARY KEY AUTO_INCREMENT,
    document INT NOT NULL,
    amount FLOAT NOT NULL,
    phone VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
);

-- Tabla 'users'
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    document INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL
);