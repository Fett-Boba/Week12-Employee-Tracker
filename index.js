const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: 'password',
     database: 'hw_employee_tracker_db',
});

connection.connect((err) => {
     if (err) throw err;
     runEmpTracker();
});

const runEmpTracker = () => {
     inquirer
          .prompt({
               name: 'action',
               type: 'rawlist',
               message: 'What would you like to do?',
               choices: [
                    'View all employees',
                    'View all employees by department',
                    'View all employees by manager',
                    'View all roles',
                    'Add employee',
               ],
          })
          .then((answer) => {
               switch (answer.action) {
                    case 'View all employees':
                         srchAllEmps();
                         break;

                    case 'View all employees by department':
                         srchAllEmpsByDept();
                         break;

                    case 'View all employees by manager':
                         srchAllEmpsByMgr();
                         break;

                    case 'View all roles':
                         srchAllRoles();
                         break;

                    case 'Add employee':
                         addEmployee();
                         break;


                    default:
                         console.log(`Invalid action: ${answer.action}`);
                         break;
               }
          });
};

function srchAllEmps() {
     connection.query(
          "select e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, concat(m.first_name, ' ' ,m.last_name) as manager from employee e left join employee m on m.id = e.manager_id inner join role r on e.role_id = r.id inner join Department d on r.department_id = d.id order by e.last_name",
          (err, res) => {
               if (err) throw err;
               console.table(res);
               runEmpTracker();
          });
}

function srchAllEmpsByDept() {
     connection.query(
          "select e.id, e.first_name, e.last_name, d.name as department from employee e inner join role r on e.role_id = r.id inner join department d on r.department_id = d.id order by d.name, e.last_name",
          (err, res) => {
               if (err) throw err;
               console.table(res);
               runEmpTracker();
          });
}

function srchAllEmpsByMgr() {
     connection.query(
          "SELECT e.id, e.first_name, e.last_name, concat(m.first_name, ' ' ,m.last_name) as 'manager' from employee e left join employee m on m.id = e.manager_id order by manager, e.last_name",
          (err, res) => {
               if (err) throw err;
               console.table(res);
               runEmpTracker();
          });
}

function srchAllRoles() {
     connection.query(
          "SELECT id, title, salary from role order by title",
          (err, res) => {
               if (err) throw err;
               console.table(res);
               runEmpTracker();
          });
}

function addEmployee() {
     connection.query(
          'INSERT INTO products SET ?',
          {
               flavor: 'Rocky Road',
               price: 3.0,
               quantity: 50,
          },
          (err, res) => {
               if (err) throw err;
               console.log(`${res.affectedRows} product inserted!\n`);
               // Call updateProduct AFTER the INSERT completes
               updateProduct();
          }
     )
}









const createProduct = () => {
     const query = connection.query(
          'INSERT INTO products SET ?',
          {
               flavor: 'Rocky Road',
               price: 3.0,
               quantity: 50,
          },
          (err, res) => {
               if (err) throw err;
               console.log(`${res.affectedRows} product inserted!\n`);
               // Call updateProduct AFTER the INSERT completes
               updateProduct();
          }
     );

     // logs the actual query being run
     console.log(query.sql);
};


