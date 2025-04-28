-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS wallet;
USE wallet;

CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document INT NOT NULL,
    amount FLOAT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    token INT NOT NULL,
    created_at VARCHAR(255) NOT NULL
);

CREATE TABLE wallet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    document INT NOT NULL,
    amount FLOAT NOT NULL,
    phone VARCHAR(255) NOT NULL,
    created_at VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    document INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL
);
