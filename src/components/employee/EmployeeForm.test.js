import { validate } from "./EmployeeForm";

describe("test Employee validator", () => {
  it("no problem ", () => {
    const error = validate({
      firstName: "John",
      lastName: "Smith",
      annualSalary: "60050",
      superannuation: "9.5"
    });
    expect(error).toEqual({});
  });
  it(" empty fields ", () => {
    const error = validate({
      firstName: "",
      lastName: "",
      annualSalary: "",
      superannuation: ""
    });
    expect(error).toEqual({
      annualSalary: "must be positive value",
      firstName: "first name is required",
      lastName: "last name is required",
      superannuation: "must be 0% - 50% inclusive"
    });
  });
  it(" empty fields ", () => {
    const error = validate({
      firstName: "John",
      lastName: "Smith",
      annualSalary: "-1",
      superannuation: "50.1"
    });
    expect(error).toEqual({
      annualSalary: "must be positive value",
      superannuation: "must be 0% - 50% inclusive"
    });
  });
});
