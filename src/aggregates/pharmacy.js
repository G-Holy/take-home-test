import { Fervex } from "../entities/drugs/fervex";
import { HerbalTea } from "../entities/drugs/herbal-tea";
import { MagicPill } from "../entities/drugs/magic-pill";
import { NormalDrug } from "../entities/drugs/normal-drug";
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
    case "Herbal Tea":
      return new HerbalTea(expiresIn, benefit);
    case "Magic Pill":
      return new MagicPill(expiresIn, benefit);
    case "Fervex":
      return new Fervex(expiresIn, benefit);
    default:
      return new NormalDrug(name, expiresIn, benefit);
  }
}
