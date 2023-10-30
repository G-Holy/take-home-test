import { Benefit } from "../../value-objects/benefit";
import { ExpiresIn } from "../../value-objects/expires-in";

export class LegacyDrug {
  constructor(name, expiresIn, benefit) {
    this.expiresIn = new ExpiresIn(expiresIn);
    this.benefit = new Benefit(benefit);
    this.name = name;
  }

  update() {
    this.expiresIn = this.expiresIn.updateToNextDay();
    this.benefit = this.benefit.decrease(1);

    if (this.expiresIn.isExpired()) {
      this.benefit = this.benefit.decrease(1);
    }

    return {
      name: this.name,
      expiresIn: this.expiresIn.days,
      benefit: this.benefit.value,
    };
  }
}
