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
select e.id,
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
select id,
	title,
    salary
from role
order by title;
-- 
-- Delete employee
--
use hw_employee_tracker_db;
SET SQL_SAFE_UPDATES=0;
delete from employee where last_name = 'Vance' and first_name = 'Phyllis';
-- 
-- Update employee Role
-- 
use hw_employee_tracker_db;
select 	e.first_name, 
    e.last_name, 
    r.id,
    r.title 
from employee e 
inner join role r on e.role_id = r.id
where first_name = 'Pam' and last_name = 'Beesly';

use hw_employee_tracker_db;
update employee e
inner join role r on role_id = r.id
set role_id = '8'
where e.first_name = 'Pam' and e.last_name = 'Beesly';
