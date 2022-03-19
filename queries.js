const inquire = require("inquirer");
const db = require("./config/connection");
var department = [];

function viewRoles() {
  db.query(
    "SELECT role.id, role.title, role.salary, department.name AS Department FROM role JOIN department ON role.department_id = department.id ORDER BY role.id",
    function (err, results) {
      console.table(results);
    }
  );
}

function viewEmployees() {
  db.query(
    "SELECT m.id, CONCAT(m.first_name, ' ', m.last_name) AS Employee, role.title, CONCAT(e.first_name, ' ', e.last_name) AS Manager FROM employee m JOIN role ON m.role_id = role.id LEFT JOIN employee e ON m.manager_id = e.id ORDER BY m.id",
    function (err, results) {
      console.table(results);
    }
  );
}

function addDepartment() {
  inquire
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "new_department",
      },
    ])
    .then((res) => {
      db.query(
        `INSERT INTO department(name) VALUES ('${res.new_department}')`,
        function (err, results) {
          console.log(`Added ${res.new_department} to the database`);
        }
      );
    });
}

function addRole() {
  db.query("SELECT * FROM department", function (err, results) {
    department = [];
    var department_id = [];
    results.forEach((el) => {
      department.push(el.name);
      department_id.push(el.id);
    });

    inquire
      .prompt([
        {
          type: "input",
          message: "What is the name of the role?",
          name: "role_name",
        },
        {
          type: "input",
          message: "What is the salary of the role?",
          name: "salary",
        },
        {
          type: "rawlist",
          message: "Which department does the role belong to?",
          name: "department",
          choices: department,
        },
      ])
      .then((res) => {
        const id = department_id[department.indexOf(res.department)];
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ('${res.role_name}', ${res.salary}, ${id})`,
          function (err, results) {
            console.log(`Added ${res.role_name} to the database`);
          }
        );
      });
  });
}

function addEmployee() {
  db.query("SELECT * FROM role", function (err, results) {
    var roles = [];
    var role_id = [];
    results.forEach((el) => {
      roles.push(el.title);
      role_id.push(el.id);
    });

    db.query("SELECT * FROM employee", function (err, results) {
      var employee_name = [];
      var employee_id = [];
      results.forEach((el) => {
        employee_name.push(`${el.first_name} ${el.last_name}`);
        employee_id.push(el.id);
      });
      employee_name.push("None");

      inquire
        .prompt([
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
          },
          {
            type: "rawlist",
            message: "What is the employee's role?",
            name: "role",
            choices: roles,
          },
          {
            type: "rawlist",
            message: "Who is the employee's manager?",
            name: "manager",
            choices: employee_name,
          },
        ])
        .then((res) => {
          let id = role_id[roles.indexOf(res.role)];
          let manager_id;
          if (res.manager === "None") {
            manager_id = null;
          } else {
            manager_id = employee_id[employee_name.indexOf(res.manager)];
          }
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${res.first_name}', '${res.last_name}', ${id}, ${manager_id})`,
            function (err, results) {
              console.log(
                `Added ${res.first_name} ${res.last_name} to the database`
              );
            }
          );
        });
    });
  });
}

function updateEmployee() {
  console.log("hi");
  db.query("SELECT * FROM role", function (err, results) {
    var roles = [];
    var role_id = [];
    results.forEach((el) => {
      roles.push(el.title);
      role_id.push(el.id);
    });

    db.query("SELECT * FROM employee", function (err, results) {
      var employee_name = [];
      var employee_id = [];
      results.forEach((el) => {
        employee_name.push(`${el.first_name} ${el.last_name}`);
        employee_id.push(el.id);
      });

      inquire
        .prompt([
          {
            type: "rawlist",
            message: "Which employee's role do you want to update?",
            name: "employee",
            choices: employee_name,
          },
          {
            type: "rawlist",
            message: "What is the employee's new role?",
            name: "new_role",
            choices: roles,
          },
        ])
        .then((res) => {
          let roleId = role_id[roles.indexOf(res.new_role)];

          let employeeId = employee_id[employee_name.indexOf(res.employee)];

          db.query(
            `UPDATE employee SET role_id = ${roleId} WHERE id = ${employeeId}`,
            function (err, results) {
              console.log(`Updated ${res.employee} to the database`);
            }
          );
        });
    });
  });
}

module.exports = {
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployee,
};
