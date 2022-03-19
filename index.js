const inquire = require("inquirer");
const db = require("./config/connection");

function init() {
  inquire
    .prompt([
      {
        type: "rawlist",
        message: "What would you like to do?",
        name: "first_question",
        choices: [
          "view all departments",
          "view all role",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee",
        ],
      },
    ])
    .then((response) => {
      switch (response.first_question) {
        case "view all departments":
          db.query("SELECT * FROM department", function (err, results) {
            console.table(results);
          });
          break;

        case "view all role":
          db.query("SELECT * FROM role", function (err, results) {
            console.table(results);
          });
          break;

        case "view all employees":
          db.query("SELECT * FROM employee", function (err, results) {
            console.table(results);
          });
          break;

        default:
          break;
      }
    });
}

init();
