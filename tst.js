const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: 'password',
     database: 'hw_employee_tracker_db',
});


function srchAllEmps() {
     connection.query(
          "SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, concat(m.first_name, ' ' ,m.last_name) as manager from employee e left join employee m on m.id = e.manager_id inner join role r on e.role_id = r.id inner join Department d on r.department_id = d.id;",
          (err, res) => {
               if (err) throw err;
               console.table(res);
          });
}

function srchEmpsByDept() {
     connection.query(
          "SELECT e.id,e.first_name, e.last_name, d.name as department from employee e left join employee m on m.id = e.manager_id inner join role r on e.role_id = r.id inner join Department d on r.department_id = d.id where d.name = ?",
          ['Sales'],
          (err, res) => {
               if (err) throw err;
               console.table(res);
          });
}



connection.connect((err) => {
     if (err) throw err;
     console.log(`connected as id ${connection.threadId}`);
     //srchAllEmps();
     srchEmpsByDept();

});
