import { Benefit } from "../../value-objects/benefit/benefit";
import { ExpiresIn } from "../../value-objects/expires-in/expires-in";

export class HerbalTea {
  constructor(expiresIn, benefit) {
    this.expiresIn = new ExpiresIn(expiresIn);
    this.benefit = new Benefit(benefit);
  }

  update() {
    this.expiresIn = this.expiresIn.updateToNextDay();
    this.benefit = this.benefit.increase(this.expiresIn.isExpired() ? 2 : 1);

    return {
      name: "Herbal Tea",
      expiresIn: this.expiresIn.days,
      benefit: this.benefit.value,
    };
  }
}
