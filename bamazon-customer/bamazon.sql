DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id integer primary key AUTO_INCREMENT,
  product_name varchar(25),
  department_name varchar(25),
  price integer,
  stock_quantity integer
);

-- Creates new rows containing data in all named columns --
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diapers", "baby", 350.00, 100),
("Onesies", "baby", 100.00, 50),
("Mittens", "baby", 500.00, 25),
("Rocker", "baby", 149.99, 10),
("Swing", "baby", 750.23, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "toddler", 170.99, 100),
("Onesies", "toddler", 100.00, 50),
("Sofa", "furniture", 499.99, 25),
("Chair", "furniture", 149.99, 10),
("Bed", "furniture", 750.23, 15);

create user bamazon@localhost identified with mysql_native_password by 'bamazon';
grant all privileges on bamazon.* to bamazon@localhost;
