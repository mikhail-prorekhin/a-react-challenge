import generatePaylyst, { isNumber, getIncomeTax } from "./index";

describe("isNumber test", () => {
  it("an empty string is not a number", () => {
    expect(isNumber("")).toBe(false);
    expect(isNumber("   ")).toBe(false);
  });

  it("a boolean type is not a number", () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber(false)).toBe(false);
  });

  it("the null/undefined/ an object is not a number", () => {
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
  });

  it("a incorrect string is not a number", () => {
    expect(isNumber("1+3")).toBe(false);
    expect(isNumber("x12")).toBe(false);
    expect(isNumber("2.3.2")).toBe(false);
    expect(isNumber("2..2")).toBe(false);
    expect(isNumber("1,222.3")).toBe(false);
  });

  it("the valid values", () => {
    expect(isNumber(1.3)).toBe(true);
    expect(isNumber(-23)).toBe(true);
    expect(isNumber("1.3")).toBe(true);
    expect(isNumber("1e-3")).toBe(true);
  });
});

describe("getIncomeTax test", () => {
  it("throw an exception if it is not a number ", () => {
    expect(() => {
      getIncomeTax(" ");
    }).toThrow();
  });
  it("throw an exception if it is a negative value", () => {
    expect(() => {
      getIncomeTax(-1);
    }).toThrow();
  });

  it("no tax if the incom less or equal than 18200", () => {
    expect(getIncomeTax(0.1)).toBe(0);
    expect(getIncomeTax(20000.0)).toBeGreaterThan(0);
    expect(getIncomeTax(18199.99)).toBe(0);
  });

  it("tax if the incom less or equal than 37000", () => {
    expect(getIncomeTax(20000)).toBe(29);
    // (20000-18200) * 0.19 = 1800* 0.19 = 342
    // 342 / 12 = 28.5
    //  29
  });

  it("tax if the incom less or equal than 87000", () => {
    expect(getIncomeTax(50000)).toBe(650);
    // (50000-37000) * 0.325 = 13000* 0.325 = 4225
    // 4225 + 3572 = 7797
    // 7797 / 12 = 649.75
    //  650
  });

  it("tax if the incom less or equal than 180000", () => {
    expect(getIncomeTax(150000)).toBe(3594);
    // (150000-87000) * 0.37 = 63000* 0.37 = 23310
    // 23310 + 19822 = 43132
    // 43132 / 12 = 3594.33333333
    //  3594
  });

  it("tax if the incom more than 180000", () => {
    expect(getIncomeTax(200000)).toBe(5269);
    // (200000-180000) * 0.45 = 20000* 0.45 = 9000
    // 9000 + 54232 = 63232
    // 63232 / 12 = 5269.33333333
    //  5269
  });
});

describe("payment generation  test", () => {
  it("wrong the income value", () => {
    expect(() => {
      generatePaylyst(-20, 20);
    }).toThrow();
  });

  it("wrong superannuation value", () => {
    expect(() => {
      generatePaylyst(20, -120);
    }).toThrow();
    expect(() => {
      generatePaylyst(20, 51);
    }).toThrow();
  });

  it("wrong superannuation value", () => {
    expect(() => {
      generatePaylyst(20, -120);
    }).toThrow();
    expect(() => {
      generatePaylyst(20, 51);
    }).toThrow();
  });

  it("wrong superannuation value", () => {
    expect(() => {
      generatePaylyst(20, -120);
    }).toThrow();
    expect(() => {
      generatePaylyst(20, 51);
    }).toThrow();
  });

  it("check payroll calculation", () => {

    let {grossIncome, incomeTax, netIncome, superannuation, payment} = generatePaylyst(60050, 9.5);
    expect(grossIncome).toBe(5004);
    expect(incomeTax).toBe(922);
    expect(netIncome).toBe(4082);
    expect(superannuation).toBe(475);
    expect(payment).toBe(3607);
  });

});
