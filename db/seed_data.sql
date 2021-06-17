use hw_employee_tracker_db;
insert into department(`name`) values("Executive");
insert into department(`name`) values("Technology");
insert into department(`name`) values("Project Management");

insert into role(title, salary, department_id) values("Lead Cat Herder", 500000.00, 1);
insert into role(title, salary, department_id) values("Programmer", 400000.00, 2);
insert into role(title, salary, department_id) values("Project Lead", 400000.00, 3);

insert into employee (first_name, last_name, role_id, manager_id) values ("Sparky", "Thecat", 1, 1);
insert into employee (first_name, last_name, role_id, manager_id) values ("Tami", "Theprogrammer", 2, 1);
insert into employee (first_name, last_name, role_id, manager_id) values ("Jazzy", "Theprojectmgr", 3, 1);