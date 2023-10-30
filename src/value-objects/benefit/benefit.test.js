import { Benefit } from "./benefit";
import { InvalidBenefitValueException } from "./invalid-benefit-value-exception";

describe("Benefit", () => {
  it("should never be created with a value above 50", () => {
    expect(() => new Benefit(51)).toThrowError(InvalidBenefitValueException);
  });

  it("should never be created with a negative value", () => {
    expect(() => new Benefit(-1)).toThrowError(InvalidBenefitValueException);
  });
});
