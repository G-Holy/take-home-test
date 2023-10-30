import { Benefit } from "../../value-objects/benefit/benefit";
import { ExpiresIn } from "../../value-objects/expires-in/expires-in";

export class NormalDrug {
  constructor(name, expiresIn, benefit) {
    this.expiresIn = new ExpiresIn(expiresIn);
    this.benefit = new Benefit(benefit);
    this.name = name;
  }

  update() {
    this.expiresIn = this.expiresIn.updateToNextDay();
    this.benefit = this.benefit.decrease(this.expiresIn.isExpired() ? 2 : 1);

    return {
      name: this.name,
      expiresIn: this.expiresIn.days,
      benefit: this.benefit.value,
    };
  }
}
