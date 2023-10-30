import { Benefit } from "../../value-objects/benefit";
import { ExpiresIn } from "../../value-objects/expires-in";

export class MagicPill {
  constructor(expiresIn, benefit) {
    this.expiresIn = new ExpiresIn(expiresIn);
    this.benefit = new Benefit(benefit);
  }

  update() {
    return {
      name: "Magic Pill",
      expiresIn: this.expiresIn.days,
      benefit: this.benefit.value,
    };
  }
}
