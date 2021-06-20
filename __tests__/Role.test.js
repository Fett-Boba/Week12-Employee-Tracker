// Role object JEST tests
const { expect } = require("@jest/globals");
const Role = require("../lib/Role");

describe("Role Class", () => {
     
     it("should create a new role object", () => {
          const role = new Role("1","Lead Cat Herder", "12345.67", "2");
          expect(role.id).toBe("1");
          expect(role.title).toBe("Lead Cat Herder");
          expect(role.salary).toBe("12345.67");
          expect(role.department_id).toBe("2");
     });

     it("should create a new role id", () => {
          const role = new Role("1","Lead Cat Herder", "12345.67", "2");
          expect(role.id).toBe("1");
     });

     it("should create a new role title", () => {
          const role = new Role("1","Lead Cat Herder", "12345.67", "2");
          expect(role.title).toBe("Lead Cat Herder");
     });

     it("should create a new role salary", () => {
          const role = new Role("1","Lead Cat Herder", "12345.67", "2");
          expect(role.salary).toBe("12345.67");
     });

     it("should create a new role department_id", () => {
          const role = new Role("1","Lead Cat Herder", "12345.67", "2");
          expect(role.department_id).toBe("2");
     });

});