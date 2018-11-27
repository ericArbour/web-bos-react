import formatMoney from "../lib/formatMoney";

describe("formatMoney", () => {
  it("works with fractional dollars", () => {
    expect(formatMoney(1)).toEqual("$0.01");
  });

  it("leaves cents off for whole dollars", () => {
    expect(formatMoney(5000)).toEqual("$50");
  });

  it("works with whole and fractional dollars", () => {
    expect(formatMoney(5012)).toEqual("$50.12");
  });
});
