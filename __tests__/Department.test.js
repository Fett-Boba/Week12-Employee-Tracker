// Department object JEST tests
const Department = require("../lib/Department");

describe("Department Class", () => {
     
     it("should create a new department object", () => {
          const dept = new Department("1", "Technology");
          expect(dept.id).toBe("1");
          expect(dept.name).toBe("Technology");          
     });

     it("should get the department ID", () => {
          const dept = new Department("1", "Technology");
          expect(dept.id).toBe("1");
     });

     it("should get the department name", () => {
          const dept = new Department("1", "Technology");
          expect(dept.name).toBe("Technology");          
     });
   
});