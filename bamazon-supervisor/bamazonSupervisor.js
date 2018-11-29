var mysql = require("mysql");
var inquirer = require('inquirer');
var table = require('console.table')

var questions = [
	{
		type: "list", 
		name: "option",
		message: "Select an option below?",
    choices: ['View product sale by department', 'Create new department']
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
  inquirer.prompt(questions).then(function(answers){
    console.log(answers.option);
    if(answers.option == 'View product sale by department') {
      productSale();
    } else if(answers.option == 'Create new department') {
      create();
    }
  });
}

function create() {
  inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "Enter department name?"
    },
    {
      type: "input",
      name: "overheadCost",
      message: "Enter over head cost?"
    }
  ]).then(function(answers) {
    connection.query("INSERT into departments SET ?", {
      department_name: answers.deptName,
      over_head_costs: answers.overheadCost
    },
     function(err, res) {
      if (err) throw err;
      question();
    });
  });
}

function productSale() {
  connection.query("select dt.department_id, dt.department_name, dt.over_head_costs, sum(dt.product_sale) as product_sales, (sum(dt.product_sale) - dt.over_head_costs) as total_profit from (select d.department_id, d.department_name, d.over_head_costs, ifnull(p.product_sale,0) as product_sale  from departments d left join products p on d.department_name = p.department_name) as dt group by department_id", function(err, res) {
      if (err) throw err;
      console.table(res);
      question();
    });
}