import { Benefit } from "../../value-objects/benefit/benefit";
import { ExpiresIn } from "../../value-objects/expires-in/expires-in";

export class MagicPill {
  constructor(expiresIn, benefit) {
    this.expiresIn = new ExpiresIn(expiresIn);
    this.benefit = new Benefit(benefit);
  }

  update() {
    return {
      expiresIn: this.expiresIn.days,
      benefit: this.benefit.value,
    };
  }
}
