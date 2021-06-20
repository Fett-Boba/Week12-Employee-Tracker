use hw_employee_tracker_db;
insert into department(`name`) values("Sales");
insert into department(`name`) values("Human Resources");
insert into department(`name`) values("Finance");
insert into department(`name`) values("Operations");
insert into department(`name`) values("Admin");

insert into role(title, salary, department_id) values("Sales Executive", 250000, 1);
insert into role(title, salary, department_id) values("HR Executive", 250000, 2);
insert into role(title, salary, department_id) values("Sales Lead", 150000.00, 1);
insert into role(title, salary, department_id) values("Accountant", 150000.00, 3);
insert into role(title, salary, department_id) values("Salesperson", 125000.00, 1);
insert into role(title, salary, department_id) values("HR Analyst", 80000.00, 2);
insert into role(title, salary, department_id) values("Admin Assistant", 60000.00, 5);
insert into role(title, salary, department_id) values("Delivery", 60000.00, 4);

insert into employee (first_name, last_name, role_id, manager_id) values ("Holly", "Flax", 2, 1);
insert into employee (first_name, last_name, role_id, manager_id) values ("Michael", "Scott", 1, 1);
insert into employee (first_name, last_name, role_id, manager_id) values ("Dwight", "Shrute", 3, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Jim", "Halpert", 5, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Pam", "Beesly", 7, 1);
insert into employee (first_name, last_name, role_id, manager_id) values ("Kevin", "Malone", 5, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Toby", "Flenderson", 6, 1);
insert into employee (first_name, last_name, role_id, manager_id) values ("Stanley", "Hudson", 5, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Angela", "Martin", 4, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Merideth", "Palmer", 4, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Phyllis", "Vance", 5, 2);
insert into employee (first_name, last_name, role_id, manager_id) values ("Roy", "Anderson", 8, 1);
insert into employee (first_name, last_name, role_id, manager_id) values ("Darryl", "Philbin", 8, 1);

