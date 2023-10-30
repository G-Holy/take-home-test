export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  setExpiresIn(expiresIn) {
    this.expiresIn = expiresIn;
  }

  setBenefit(benefit) {
    this.benefit = benefit;
  }
}
