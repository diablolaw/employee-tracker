const inquire = require("inquirer");
const db = require("./config/connection");
const queryFunctions = require("./queries");

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
          //   db.query("SELECT * FROM role", function (err, results) {
          //     console.table(results);
          //   });
          queryFunctions.viewRoles();
          break;

        case "view all employees":
          queryFunctions.viewEmployees();
          break;

        case "add a department":
          queryFunctions.addDepartment();
          break;

        case "add a role":
          queryFunctions.addRole();
          break;

        case "add an employee":
          queryFunctions.addEmployee();
          break;

        case "update an employee":
          queryFunctions.updateEmployee();
          break;

        default:
          break;
      }
    });
}

init();
