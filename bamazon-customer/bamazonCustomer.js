//Bamazon Customer JavaScript
var mysql = require("mysql");
var inquirer = require('inquirer');

var questions = [
	{
		type: "input", 
		name: "itemId",
		message: "Enter the ID of the product?"
	},
	{
		type: "input",
		name: "itemQuantity",
		message: "Enter the quantity of the product?"
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
  read();
});

function read() {
	connection.query("SELECT * FROM products", function(err, res) {
	    if (err) throw err;
	    // Log all results of the SELECT statement
	    console.log("Item Id\tQuantity\tPrice\t\tProduct Name\tDepartment Name");
	    for(var row in res) {
	    	var product = res[row];
	    	console.log(product.item_id+"\t"+product.stock_quantity+"\t\t"+product.price+"\t\t"+product.product_name+"\t\t"+product.department_name);
	    }

	    question(res);
  	});
}

function question(response) {
	inquirer.prompt(questions).then(function(answers) {
  		for(var row in response) {
  			var product = response[row];
  			if(product.item_id == answers.itemId) {
  				if(product.stock_quantity >= answers.itemQuantity) {
  					update(product, answers.itemQuantity);
  					break;
  				} else {
  					console.log("Insufficient Quantity!!!");
  					break;
  				}
  			} 
  		}
  	});
}

function update(product, quantity) {
	var pQuantity = product.stock_quantity - quantity;
	var query = "UPDATE products set stock_quantity = "+pQuantity+" where item_id = "+product.item_id;
	connection.query(query, function(err, res) {
		if(err) throw err;

		console.log("Successfully purchased " + quantity + " " + product.product_name + "'s!");
		console.log("Total Cost:" + quantity * product.price +"\n\n");
		read();
	});
}