import { InvalidBenefitValueException } from "./invalid-benefit-value-exception";

export class Benefit {
  constructor(value) {
    if (value > 50 || value < 0) {
      throw new InvalidBenefitValueException(value);
    }

    this.value = value;
  }

  increase(value) {
    const sum = this.value + value;
    if (sum > 50) {
      return new Benefit(50);
    }
    return new Benefit(sum);
  }

  decrease(value) {
    const sum = this.value - value;
    if (sum < 0) {
      return new Benefit(0);
    }
    return new Benefit(sum);
  }
}
