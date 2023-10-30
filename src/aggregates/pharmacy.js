import { LegacyDrug } from "../entities/drugs/legacy-drug";
export class Pharmacy {
  #identifiedDrugs;

  constructor(drugs = []) {
    this.drugs = drugs;
    this.#identifiedDrugs = drugs.map((drug) => createDrug(drug));
  }

  updateBenefitValue() {
    for (var i = 0; i < this.#identifiedDrugs.length; i++) {
      const { expiresIn, benefit } = this.#identifiedDrugs[i].update();
      this.drugs[i].setExpiresIn(expiresIn);
      this.drugs[i].setBenefit(benefit);
    }

    return this.drugs;
  }
}

function createDrug({ name, expiresIn, benefit }) {
  switch (name) {
    default:
      return new LegacyDrug(name, expiresIn, benefit);
  }
}
