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
inner join Department d on r.department_id = d.id
order by e.last_name;
--
-- View all employees by department
-- 
use hw_employee_tracker_db;
select e.id, 
	e.first_name, 
    e.last_name, 
    d.`name` as department 
from employee e 
inner join role r on e.role_id = r.id 
inner join department d on r.department_id = d.id 
order by d.`name`, e.last_name;
--
-- View all employees by manager
-- 
use hw_employee_tracker_db;
SELECT e.id,
	e.first_name,
    e.last_name,
	concat(m.first_name, ' ' ,m.last_name) as 'manager'
from employee e
left join employee m on m.id = e.manager_id
order by manager, e.last_name;
--
-- View all roles
-- 
use hw_employee_tracker_db;
SELECT id,
	title,
    salary
from role
order by title;
-- 
-- Insert employee
--


