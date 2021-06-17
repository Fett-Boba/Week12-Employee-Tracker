drop database if exists hw_employee_tracker_db;
create database hw_employee_tracker_db;
use hw_employee_tracker_db;

create table department (
    id int auto_increment not null,
    `name` varchar(30) not null,
    primary key (id)
);

create table `role` (
    id int auto_increment not null,
    title varchar(30) not null,
    salary decimal(10,2) not null,
    department_id int not null,
    primary key (id),
    foreign key fk_department(department_id) references department(id)
);

create table employee (
    id int auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    manager_id int,
    primary key (id),
    foreign key fk_role(role_id) references `role`(id),
    foreign key fk_manager(manager_id) references employee(id)
);



