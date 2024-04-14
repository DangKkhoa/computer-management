CREATE DATABASE IF NOT EXISTS `computer_management` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `computer_management`;

CREATE TABLE `user` (
    `user_id` INT PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(50) COLLATE utf8_unicode_ci NOT NULL,
    `password` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
    `username` VARCHAR(30) COLLATE utf8_unicode_ci NOT NULL,
    `fulllname` NVARCHAR(50) COLLATE utf8_unicode_ci NOT NULL,
    `is_admin` BOOLEAN NOT NULL,
    `profile_picture` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT 'user.png',
    `phone` VARCHAR(10) DEFAULT NULL,
    UNIQUE(`email`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `customer` (
    `customer_id` INT PRIMARY KEY AUTO_INCREMENT,
    `customer_name` VARCHAR(50) COLLATE utf8_unicode_ci,
    `customer_phone` VARCHAR(50) COLLATE utf8_unicode_ci,
    `customer_password` VARCHAR(50) COLLATE utf8_unicode_ci,
)