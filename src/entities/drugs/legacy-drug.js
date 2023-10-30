import { Benefit } from "../../value-objects/benefit";
import { ExpiresIn } from "../../value-objects/expires-in";

export class LegacyDrug {
  constructor(name, expiresIn, benefit) {
    this.expiresIn = new ExpiresIn(expiresIn);
    this.benefit = new Benefit(benefit);
    this.name = name;
  }

  update() {
    if (this.name == "Magic Pill") {
      return {
        name: this.name,
        expiresIn: this.expiresIn.days,
        benefit: this.benefit.value,
      };
    }

    if (this.name != "Fervex") {
      this.benefit = this.benefit.decrease(1);
    }

    if (this.name == "Fervex") {
      this.benefit = this.benefit.increase(1);

      if (this.expiresIn.days <= 10) {
        this.benefit = this.benefit.increase(1);
      }

      if (this.expiresIn.days <= 5) {
        this.benefit = this.benefit.increase(1);
      }
    }

    this.expiresIn = this.expiresIn.updateToNextDay();

    if (this.name != "Fervex" && this.expiresIn.isExpired()) {
      this.benefit = this.benefit.decrease(1);
    }

    if (this.name == "Fervex" && this.expiresIn.isExpired()) {
      this.benefit = new Benefit(0);
    }

    return {
      name: this.name,
      expiresIn: this.expiresIn.days,
      benefit: this.benefit.value,
    };
  }
}
