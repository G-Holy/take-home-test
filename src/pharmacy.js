export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }
  updateBenefitValue() {
    for (var i = 0; i < this.drugs.length; i++) {
      const drug = this.drugs[i];

      if (drug.name == "Magic Pill") {
        continue;
      }

      if (
        drug.name != "Herbal Tea" &&
        drug.name != "Fervex" &&
        drug.benefit > 0
      ) {
        drug.benefit = drug.benefit - 1;
      }

      if (drug.name == "Herbal Tea" && drug.benefit < 50) {
        drug.benefit = drug.benefit + 1;
      }

      if (drug.name == "Fervex") {
        // TODO : FIX can break "never above 50"
        if (drug.benefit < 50) {
          drug.benefit = drug.benefit + 1;

          if (drug.expiresIn <= 10 && drug.benefit < 50) {
            drug.benefit = drug.benefit + 1;
          }

          if (drug.expiresIn <= 5 && drug.benefit < 50) {
            drug.benefit = drug.benefit + 1;
          }
        }
      }

      drug.expiresIn = drug.expiresIn - 1;

      if (
        drug.name != "Fervex" &&
        drug.name != "Herbal Tea" &&
        drug.benefit > 0 &&
        drug.expiresIn < 0
      ) {
        drug.benefit = drug.benefit - 1;
      }

      if (drug.name == "Fervex" && drug.expiresIn < 0) {
        drug.benefit = 0;
      }

      if (
        drug.name == "Herbal Tea" &&
        drug.expiresIn < 0 &&
        drug.benefit < 50
      ) {
        drug.benefit = drug.benefit + 1;
      }
    }

    return this.drugs;
  }
}
