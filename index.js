const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

console.log(" ");
console.log("     +-----------------------------------------+");
console.log("     |                                         |");
console.log("     |            E M P L O Y E E              |");
console.log("     |             T R A C K E R               |");
console.log("     |                                         |");
console.log("     +-----------------------------------------+");
console.log(" ");



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
                    'Add new employee',
                    'Delete employee',
                    'Update employee role',
                    'Update employee manager',
                    'View all departments',
                    'View all roles',
                    'Add new department',
                    'Add new role',
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

                    case 'Add new employee':
                         addNewEmp();
                         break;

                    case 'Delete employee':
                         deleteEmployee();
                         break;

                    case 'Update employee role':
                         updateEmpRole();
                         break;

                    case 'Update employee manager':
                         updateEmpMgr();
                         break;

                    case 'View all departments':
                         srchAllDepts();
                         break;

                    case 'View all roles':
                         srchAllRoles();
                         break;

                    case 'Add new department':
                         addNewDept();
                         break;

                    case 'Add new role':
                         addNewRole();
                         break;

                    default:
                         console.log(`Invalid action: ${answer.action}`);
                         break;
               }
          });
};

// View all employees
function srchAllEmps() {
     connection.query("select e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, concat(m.first_name, ' ' ,m.last_name) as manager from employee e left join employee m on m.id = e.manager_id inner join role r on e.role_id = r.id inner join Department d on r.department_id = d.id order by e.last_name",
          (err, res) => {
               if (err) throw err;
               console.table(res);
               runEmpTracker();
          });
}

// View all employees by department
function srchAllEmpsByDept() {
     connection.query("select e.id, e.first_name, e.last_name, d.name as department from employee e inner join role r on e.role_id = r.id inner join department d on r.department_id = d.id order by d.name, e.last_name",
          (err, res) => {
               if (err) throw err;
               console.table(res);
               runEmpTracker();
          });
}

// View all employees by manager
function srchAllEmpsByMgr() {
     connection.query("select e.id, e.first_name, e.last_name, concat(m.first_name, ' ' ,m.last_name) as 'manager' from employee e left join employee m on m.id = e.manager_id order by manager, e.last_name",
          (err, res) => {
               if (err) throw err;
               console.table(res);
               runEmpTracker();
          });
}

// View all roles
function srchAllRoles() {
     connection.query("select id, title, salary from role order by title",
          (err, res) => {
               if (err) throw err;
               console.table(res);
               runEmpTracker();
          });
}

// View all departments
function srchAllDepts() {
     connection.query("select id, name from department order by id",
          (err, res) => {
               if (err) throw err;
               console.table(res);
               runEmpTracker();
          });
}

// Add a new department to the database
function addNewDept() {
     inquirer
          .prompt([
               {
                    name: 'dept',
                    message: 'New department name: ',
               },
          ])
          .then((answer) => {
               connection.query("insert into department(name) values(?)",
                    [answer.dept],
                    (err, res) => {
                         if (err) throw err;
                         console.table(res);
                         runEmpTracker();
                    });
          });
}

// Add a new role/salary to the database
function addNewRole() {
     inquirer
          .prompt([
               {
                    name: 'title',
                    message: 'Please add new title: ',
               },
               {
                    name: 'salary',
                    message: 'What is the salary? ',
               },
          ])
          .then((answers) => {
               console.log(answers.title + " " + answers.salary)

               let arrDept = [];
               connection.query("select id, name from department",
                    (err, res) => {
                         // Save departments onto an array to use in the menu selections
                         if (err) throw err;
                         res.forEach(({ id, name }) => {
                              arrDept.push(`${id} ${name}`);
                         });
                         inquirer
                              .prompt({
                                   name: 'department',
                                   type: 'list',
                                   message: 'Select department for this role:',
                                   choices: arrDept,
                              })
                              .then((answer) => {
                                   var dpt = answer.department.split(" ");
                                   var did = dpt[0];

                                   // Add new role
                                   connection.query("insert into role(title, salary, department_id) values(?, ?, ?)",
                                        [answers.title, answers.salary, did],
                                        (err, res) => {
                                             if (err) throw err;
                                             console.log(`\n---===>>> Title ${answers.title} with salary of ${answers.salary} has been added.\n`)
                                             runEmpTracker();
                                        });
                              });
                    });
          });

}

// Delete an employee from the database
function deleteEmployee() {
     let arrEmp = [];
     connection.query("select first_name, last_name from employee",
          (err, res) => {
               // Save employees onto an array to use in the menu selections
               if (err) throw err;
               res.forEach(({ first_name, last_name }) => {
                    arrEmp.push(`${first_name} ${last_name}`);
               });
               inquirer
                    .prompt({
                         name: 'fullname',
                         type: 'list',
                         message: 'Select employee to delete:',
                         choices: arrEmp,
                    })
                    .then((answer) => {
                         var nm = answer.fullname.split(" ");
                         var fn = nm[0];
                         var ln = nm[1];

                         // Delete the employee
                         connection.query("delete from employee where first_name = ? and last_name = ?",
                              [fn, ln],
                              (err, res) => {
                                   if (err) throw err;
                                   console.log(`\n---===>>> ${fn} ${ln} has been removed.\n`)
                                   runEmpTracker();
                              });
                    });
          });
}

// Update the employees role in the database
function updateEmpRole() {
     let arrEmp = [];
     connection.query("select first_name, last_name from employee", (err, res) => {
          // Save employees onto array for menu selections
          if (err) throw err;
          res.forEach(({ first_name, last_name }) => {
               arrEmp.push(`${first_name} ${last_name}`);
          });
          inquirer.prompt({
               name: 'fullname',
               type: 'list',
               message: 'Select employee to update:',
               choices: arrEmp,
          }).then((answer) => {
               var nm = answer.fullname.split(" ");
               var fn = nm[0];
               var ln = nm[1];

               // Save roles onto array for role menu selections
               let arrRole = [];
               connection.query("select id, title from role", (err, res) => {
                    if (err) throw err;
                    res.forEach(({ id, title }) => {
                         arrRole.push(`${id} ${title}`);
                    });
                    inquirer.prompt({
                         name: 'role',
                         type: 'list',
                         message: 'Select new employee role:',
                         choices: arrRole,
                    }).then((answer) => {
                         var idRole = answer.role;
                         var rid = idRole.substr(0, idRole.indexOf(' '));
                         var rtit = idRole.substr(idRole.indexOf(' ') + 1);

                         // Update the employee role
                         connection.query(
                              "update employee e inner join role r on role_id = r.id set role_id = ? where e.first_name = ? and e.last_name = ?",
                              [rid, fn, ln],
                              (err, res) => {
                                   if (err) throw err;
                                   console.log(`\n---===>>> ${fn} ${ln}'s new role is ${rtit}\n`);
                                   runEmpTracker();
                              });
                    });
               });
          });
     });
}

// Update the employee's manager in the datbaase 
function updateEmpMgr() {

     let arrEmp = [];
     connection.query("select first_name, last_name from employee", (err, res) => {
          // Save employees onto array for menu selections
          if (err) throw err;
          res.forEach(({ first_name, last_name }) => {
               arrEmp.push(`${first_name} ${last_name}`);
          });
          inquirer.prompt({
               name: 'fullname',
               type: 'list',
               message: 'Select employee to update:',
               choices: arrEmp,
          }).then((answer) => {
               var nm = answer.fullname.split(" ");
               var fn = nm[0];
               var ln = nm[1];

               // Save managers onto array for role menu selections
               let arrMgr = [];
               connection.query("select distinct m.id as manager_id, m.first_name, m.last_name from employee e left join employee m on m.id = e.manager_id", (err, res) => {
                    if (err) throw err;
                    res.forEach(({ manager_id, first_name, last_name }) => {
                         arrMgr.push(`${manager_id} ${first_name} ${last_name}`);
                    });
                    inquirer.prompt({
                         name: 'manager',
                         type: 'list',
                         message: 'Select new employee manager:',
                         choices: arrMgr,
                    }).then((answer) => {
                         var minfo = answer.manager.split(" ");
                         var mid = minfo[0];
                         var mfn = minfo[1];
                         var mln = minfo[2];
                         console.log(mid + " " + mfn + " " + mln);

                         // Update the employee manager
                         connection.query(
                              "update employee e left join employee m on m.id = e.manager_id set e.manager_id = ? where e.first_name = ? and e.last_name = ?",
                              [mid, fn, ln],
                              (err, res) => {
                                   if (err) throw err;
                                   console.log(`\n---===>>> ${fn} ${ln}'s new manager is ${mfn} ${mln}\n`);
                                   runEmpTracker();
                              });
                    });
               });
          });
     });
}

// Add new Employee to database
function addNewEmp() {
     inquirer
          .prompt([
               {
                    name: 'fn',
                    message: 'New employee firstname: ',
               },
               {
                    name: 'ln',
                    message: 'New employee lastname: ',
               }
          ])
          .then((answers) => {
               // Display roles and store in array
               let arrRole = [];
               connection.query("select id, title from role", (err, res) => {
                    if (err) throw err;
                    res.forEach(({ id, title }) => {
                         arrRole.push(`${id} ${title}`);
                    });
                    inquirer.prompt({
                         name: 'role',
                         type: 'list',
                         message: 'Select new employee role:',
                         choices: arrRole,
                    }).then((answer) => {

                         // Display managers and store in array                         
                         var idRole = answer.role;
                         var rid = idRole.substr(0, idRole.indexOf(' '));
                         var rtit = idRole.substr(idRole.indexOf(' ') + 1);
                         let arrMgr = [];
                         connection.query("select distinct m.id as manager_id, m.first_name, m.last_name from employee e left join employee m on m.id = e.manager_id", (err, res) => {
                              if (err) throw err;
                              res.forEach(({ manager_id, first_name, last_name }) => {
                                   arrMgr.push(`${manager_id} ${first_name} ${last_name}`);
                              });
                              inquirer.prompt({
                                   name: 'manager',
                                   type: 'list',
                                   message: 'Select new employee manager:',
                                   choices: arrMgr,
                              }).then((answer) => {
                                   var minfo = answer.manager.split(" ");
                                   var mid = minfo[0];
                                   var mfn = minfo[1];
                                   var mln = minfo[2];

                                   // Create new employee 
                                   connection.query(
                                        "insert into employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?);",
                                        [answers.fn, answers.ln, rid, mid],
                                        (err, res) => {
                                             if (err) throw err;
                                             console.log(`\n---===>>> ${answers.fn} ${answers.ln} added! Manager: ${mfn} ${mln}. Title: ${rtit}\n`);
                                             runEmpTracker();
                                        });

                              });
                         });
                    });
               });
          });
}