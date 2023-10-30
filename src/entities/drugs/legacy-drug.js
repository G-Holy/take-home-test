export class LegacyDrug {
  constructor(name, expiresIn, benefit) {
    this.expiresIn = expiresIn;
    this.benefit = benefit;
    this.name = name;
  }

  update() {
    if (this.name == "Magic Pill") {
      return {
        name: this.name,
        expiresIn: this.expiresIn,
        benefit: this.benefit,
      };
    }

    if (
      this.name != "Herbal Tea" &&
      this.name != "Fervex" &&
      this.benefit > 0
    ) {
      this.benefit = this.benefit - 1;
    }

    if (this.name == "Herbal Tea" && this.benefit < 50) {
      this.benefit = this.benefit + 1;
    }

    if (this.name == "Fervex") {
      if (this.benefit < 50) {
        this.benefit = this.benefit + 1;

        if (this.expiresIn <= 10 && this.benefit < 50) {
          this.benefit = this.benefit + 1;
        }

        if (this.expiresIn <= 5 && this.benefit < 50) {
          this.benefit = this.benefit + 1;
        }
      }
    }

    this.expiresIn = this.expiresIn - 1;

    if (
      this.name != "Fervex" &&
      this.name != "Herbal Tea" &&
      this.benefit > 0 &&
      this.expiresIn < 0
    ) {
      this.benefit = this.benefit - 1;
    }

    if (this.name == "Fervex" && this.expiresIn < 0) {
      this.benefit = 0;
    }

    if (this.name == "Herbal Tea" && this.expiresIn < 0 && this.benefit < 50) {
      this.benefit = this.benefit + 1;
    }

    return {
      name: this.name,
      expiresIn: this.expiresIn,
      benefit: this.benefit,
    };
  }
}
