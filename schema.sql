CREATE DATABASE IF NOT EXISTS url_shortener;

USE url_shortener;

CREATE TABLE IF NOT EXISTS urls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  url VARCHAR(2048) NOT NULL,
  short_code VARCHAR(10) NOT NULL UNIQUE,
  access_count INT DEFAULT 0,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  INDEX idx_short_code (short_code)
);