export class InvalidBenefitValueException extends Error {
  constructor(value) {
    super(`Invalid benefit value : ${value}`);
  }
}
