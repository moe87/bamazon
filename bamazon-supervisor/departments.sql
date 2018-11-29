USE bamazon;

CREATE TABLE departments (
  department_id integer primary key AUTO_INCREMENT,
  department_name varchar(25),
  over_head_costs integer
);

-- Creates new rows containing data in all named columns --
INSERT INTO departments (department_name, over_head_costs)
VALUES ("baby", 1000),
("toddler", 1500),
("furniture", 2000),
("electronics", 100);