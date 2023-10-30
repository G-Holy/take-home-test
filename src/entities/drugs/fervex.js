import { Benefit } from "../../value-objects/benefit/benefit";
import { ExpiresIn } from "../../value-objects/expires-in/expires-in";

export class Fervex {
  constructor(expiresIn, benefit) {
    this.expiresIn = new ExpiresIn(expiresIn);
    this.benefit = new Benefit(benefit);
  }

  update() {
    if (this.expiresIn.days <= 5) {
      this.benefit = this.benefit.increase(3);
    } else if (this.expiresIn.days <= 10) {
      this.benefit = this.benefit.increase(2);
    } else {
      this.benefit = this.benefit.increase(1);
    }

    this.expiresIn = this.expiresIn.updateToNextDay();

    if (this.expiresIn.isExpired()) {
      this.benefit = new Benefit(0);
    }

    return {
      name: "Fervex",
      expiresIn: this.expiresIn.days,
      benefit: this.benefit.value,
    };
  }
}
