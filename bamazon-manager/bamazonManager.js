var mysql = require("mysql");
var inquirer = require('inquirer');
var table = require('console.table');

var questions = [
	{
		type: "list", 
		name: "option",
		message: "Choose an option?",
    choices: ["View product for sale", "View low inventory", "Add to inventory", "Add new product"]
	}
];

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "bamazon",

  // Your password
  password: "bamazon",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  question();
});

function question() {
  inquirer.prompt(questions).then(function(answers) {
      if(answers.option == 'View product for sale') {
        read();
      } else if(answers.option == 'View low inventory') {
        low();
      } else if(answers.option == 'Add to inventory') {
        update();
      } else if(answers.option == 'Add new product') {
        add();
      }
    });
}

function read() {
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.table(res);
      question();
    });
}


function low() {
  connection.query("SELECT * FROM products where stock_quantity <= 5", function(err, res) {
      if (err) throw err;
      if(res == '') {
        console.log("No low inventory!!!");
      } else {
        console.table(res);
      }
      question();
    });
}

function update() {
  inquirer.prompt([
    {
      type: "input", 
      name: "itemId",
      message: "Enter item number to Add inventory?"
    },
    {
      type: "input", 
      name: "quantity",
      message: "Enter quantity ?"
    }
  ]).then(function(answers) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity +"+answers.quantity+" where item_id = "+answers.itemId,
     function(err, res) {
      if (err) throw err;
      read();
    });
  });
}

function add() {
  inquirer.prompt([
    {
      type: "input", 
      name: "name",
      message: "Enter product name?"
    },
    {
      type: "input", 
      name: "quantity",
      message: "Enter quantity?"
    },
    {
      type: "input", 
      name: "price",
      message: "Enter price?"
    },
    {
      type: "input", 
      name: "deptName",
      message: "Enter department?"
    }
  ]).then(function(answers) {
    connection.query("INSERT into products SET ?", {
      product_name: answers.name,
      stock_quantity: answers.quantity,
      price: answers.price,
      department_name: answers.deptName
    },
     function(err, res) {
      if (err) throw err;
      read();
    });
  });
}

