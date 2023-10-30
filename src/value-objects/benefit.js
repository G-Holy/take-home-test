export class Benefit {
  constructor(value) {
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
