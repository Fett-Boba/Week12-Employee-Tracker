// Employee object JEST tests
const Employee = require("../lib/Employee");

describe("Employee Class", () => {
     
     it("should create a new employee object", () => {
          const emp = new Employee("1", "Sparky", "TheHutt", "1", "1");
          expect(emp.id).toBe("1");
          expect(emp.first_name).toBe("Sparky");
          expect(emp.last_name).toBe("TheHutt");
          expect(emp.role_id).toBe("1");
          expect(emp.manager_id).toBe("1");
     });

     it("should get the employee ID", () => {
          const emp = new Employee("1", "Sparky", "TheHutt", "2", "3");
          expect(emp.getId()).toBe("1");
     });

     it("should get the employee first name", () => {
          const emp = new Employee("1", "Sparky", "TheHutt", "2", "3");
          expect(emp.getFirstName()).toBe("Sparky");
     });

     it("should get the employee last name", () => {
          const emp = new Employee("1", "Sparky", "TheHutt", "2", "3");
          expect(emp.getLastName()).toBe("TheHutt");
     });

     it("should get the role ID", () => {
          const emp = new Employee("1", "Sparky", "TheHutt", "2", "3");
          expect(emp.getRoleId()).toBe("2");
     });

     it("should get the manager ID", () => {
          const emp = new Employee("1", "Sparky", "TheHutt", "2", "3");
          expect(emp.getManagerId()).toBe("3");
     });

     it("should get the full name", () => {
          const emp = new Employee("1", "Sparky", "TheHutt", "2", "3");
          expect(emp.getFullName()).toBe("Sparky TheHutt");
     });

});