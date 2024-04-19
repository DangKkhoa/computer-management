CREATE DATABASE IF NOT EXISTS `computer_management` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `computer_management`;

CREATE TABLE `user` (
    `user_id` INT PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(50) COLLATE utf8_unicode_ci NOT NULL,
    `password` VARCHAR(255) COLLATE utf8_unicode_ci NOT NULL,
    `username` VARCHAR(30) COLLATE utf8_unicode_ci NOT NULL,
    `fullname` NVARCHAR(50) COLLATE utf8_unicode_ci NOT NULL,
    `role` VARCHAR(10) COLLATE utf8_unicode_ci NOT NULL,
    `profile_picture` VARCHAR(255) COLLATE utf8_unicode_ci DEFAULT 'user.png',
    `phone` VARCHAR(10) DEFAULT NULL,
    `gender` VARCHAR(10) NOT NULL,
    UNIQUE(`email`) 
); 

CREATE TABLE `customer` (
    `customer_id` INT PRIMARY KEY AUTO_INCREMENT,
    `customer_name` VARCHAR(50) COLLATE utf8_unicode_ci,
    `customer_phone` VARCHAR(50) COLLATE utf8_unicode_ci,
    `customer_address` VARCHAR(50) COLLATE utf8_unicode_ci,
    UNIQUE(`customer_phone`)
);

CREATE TABLE `product` (
    `product_id` INT PRIMARY KEY AUTO_INCREMENT,
    `product_name` VARCHAR(50) COLLATE utf8_unicode_ci NOT NULL, 
    `category` VARCHAR(50) COLLATE utf8_unicode_ci NOT NULl,
    `product_image` VARCHAR(50) COLLATE utf8_unicode_ci,
    `manufacturer` VARCHAR(50) COLLATE utf8_unicode_ci,
    `import_price` INT NOT NULL,
    `retail_price` INT NOT NULL,
    `import_date` DATE NOT NULL
);

CREATE TABLE `order` (
    `order_id` INT PRIMARY KEY AUTO_INCREMENT,
    `total_quantity` INT NOT NULL,
    `total_price` INT NOT NULL,
    `order_date` DATE NOT NULL,
    `order_time` TIME NOT NULL,
    `customer_id` INT,
    FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`)
);

CREATE TABLE `order_detail` (
    `product_id` INT,
    `order_id` INT,
    `quantity` INT,
    `unit_price` INT,
    FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`),
    FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`)
);

INSERT INTO `user`(`user_id`, `email`, `password`, `username`, `fullname`, `role`) VALUES (1, 'admin@gmail.com', '$2b$10$0otS0j0SjFchlI4SXU3tmeCeKpZo5x1SB5uOjPBshLOwB9vKLk9u2', 'admin', N'Trần Ad Min', 'ADMIN');
INSERT INTO `user`(`user_id`, `email`, `password`, `username`, `fullname`, `role`) VALUES (2, 'testuser@gmail.com', '$2b$10$tnntuHpL/HdRBIiIQnmRwuPKvB8bRyJAWM306Ky1ESmrOzNLVBHAW', 'testuser', N'Tét Du Sờ', 'BASIC');

ALTER TABLE `user` 
MODIFY `user_id` int AUTO_INCREMENT, AUTO_INCREMENT = 3;
COMMIT;

INSERT INTO `product`(`product_id`, `product_name`, `category`, `product_image`, `manufacturer`, `import_price`, `retail_price`, `import_date`)
VALUES (1, 'PC Home Office', 'PC/Office', 'pc.jpg', 'Dell', 400, 600, '2024-2-1');
INSERT INTO `product`(`product_id`, `product_name`, `category`, `product_image`, `manufacturer`, `import_price`, `retail_price`, `import_date`)
VALUES (2, 'Asus Gaming PC', 'PC/Gaming', 'pc.jpg', 'Asus', 800, 1050, '2024-3-14');
INSERT INTO `product`(`product_id`, `product_name`, `category`, `product_image`, `manufacturer`, `import_price`, `retail_price`, `import_date`)
VALUES (3, 'Laptop Gaming Asus Tuf', 'Laptop/Gaming', 'asus-tuf.jpg', 'Asus', 1000, 1200, '2024-4-1');
INSERT INTO `product`(`product_id`, `product_name`, `category`, `product_image`, `manufacturer`, `import_price`, `retail_price`, `import_date`)
VALUES (4, 'Macbook air M2', 'Laptop/Macbook', 'macbook-air-m2.jpg', 'Apple', 1099, 1299, '2024-4-18');
INSERT INTO `product`(`product_id`, `product_name`, `category`, `product_image`, `manufacturer`, `import_price`, `retail_price`, `import_date`)
VALUES (5, 'Macbook pro M1', 'Laptop/Macbook', 'macbook-pro-m1.jpg', 'Apple', 1999, 2299, '2024-3-28');

ALTER TABLE `product` 
MODIFY `product_id` int AUTO_INCREMENT, AUTO_INCREMENT = 6;
COMMIT;