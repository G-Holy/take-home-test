import { Benefit } from "../../value-objects/benefit";

export class LegacyDrug {
  constructor(name, expiresIn, benefit) {
    this.expiresIn = expiresIn;
    this.benefit = new Benefit(benefit);
    this.name = name;
  }

  update() {
    if (this.name == "Magic Pill") {
      return {
        name: this.name,
        expiresIn: this.expiresIn,
        benefit: this.benefit.value,
      };
    }

    if (this.name != "Herbal Tea" && this.name != "Fervex") {
      this.benefit = this.benefit.decrease(1);
    }

    if (this.name == "Herbal Tea") {
      this.benefit = this.benefit.increase(1);
    }

    if (this.name == "Fervex") {
      this.benefit = this.benefit.increase(1);

      if (this.expiresIn <= 10) {
        this.benefit = this.benefit.increase(1);
      }

      if (this.expiresIn <= 5) {
        this.benefit = this.benefit.increase(1);
      }
    }

    this.expiresIn = this.expiresIn - 1;

    if (
      this.name != "Fervex" &&
      this.name != "Herbal Tea" &&
      this.expiresIn < 0
    ) {
      this.benefit = this.benefit.decrease(1);
    }

    if (this.name == "Fervex" && this.expiresIn < 0) {
      this.benefit = new Benefit(0);
    }

    if (this.name == "Herbal Tea" && this.expiresIn < 0) {
      this.benefit = this.benefit.increase(1);
    }

    return {
      name: this.name,
      expiresIn: this.expiresIn,
      benefit: this.benefit.value,
    };
  }
}
