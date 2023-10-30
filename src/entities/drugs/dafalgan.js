import { Benefit } from "../../value-objects/benefit/benefit";
import { ExpiresIn } from "../../value-objects/expires-in/expires-in";

export class Dafalgan {
  constructor(expiresIn, benefit) {
    this.expiresIn = new ExpiresIn(expiresIn);
    this.benefit = new Benefit(benefit);
  }

  update() {
    this.expiresIn = this.expiresIn.updateToNextDay();
    this.benefit = this.benefit.decrease(this.expiresIn.isExpired() ? 4 : 2);

    return {
      expiresIn: this.expiresIn.days,
      benefit: this.benefit.value,
    };
  }
}
