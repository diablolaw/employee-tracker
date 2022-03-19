INSERT INTO department (name)
VALUES ('Sales'),('Finance'),('Engineering'),('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 80000, 1),
('Lead Engineer', 150000, 3),
('Software Engineer', 120000, 3),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Chan', 1, NULL),
('Ashley', 'Rodriguez', 2, NULL),
('Kevin', 'Tupik', 3, 2),
('Kunal', 'Singh', 4, NULL),
('Malia', 'Brown', 5, 4),
('Sarah', 'Lourd', 6, NULL),
('Tom', 'Allen', 7, 6);