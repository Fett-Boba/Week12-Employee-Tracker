use hw_employee_tracker_db;
select employee.first_name,
	employee.last_name,
    role.title,
    role.salary
from employee
inner join role on 
	employee.role_id = role.id;

--
-- View all employees 
--
use hw_employee_tracker_db;
SELECT e.id,
	e.first_name,
    e.last_name,
    r.title,
    d.name as 'department',
    r.salary,
	concat(m.first_name, ' ' ,m.last_name) as 'manager'
from employee e 
left join employee m on m.id = e.manager_id 
inner join role r on e.role_id = r.id 
inner join Department d on r.department_id = d.id;

--
-- View all employees by department
-- 
use hw_employee_tracker_db;
SELECT e.id,
	e.first_name,
    e.last_name,
    r.title,
    d.name as 'department',
    r.salary,
	concat(m.first_name, ' ' ,m.last_name) as 'manager'
from employee e
left join employee m on m.id = e.manager_id 
inner join role r on e.role_id = r.id 
inner join Department d on r.department_id = d.id
where d.name = "Executive";

--
-- View all employees by manager
-- 
use hw_employee_tracker_db;
SELECT e.id,
	e.first_name,
    e.last_name,
    r.title,
    d.name as 'department',
    r.salary,
	concat(m.first_name, ' ' ,m.last_name) as 'manager'
from employee e
left join employee m on m.id = e.manager_id 
inner join role r on e.role_id = r.id 
inner join Department d on r.department_id = d.id
where concat(m.first_name, ' ' ,m.last_name) = 'Sparky Thecat';




