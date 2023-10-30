import { Drug } from "../entities/drugs/drug";
import { Pharmacy } from "./pharmacy";
describe("Pharmacy", () => {
  var given_a_pharmacy;

  beforeEach(() => {
    given_a_pharmacy = new PharmacyDSL();
  });

  describe("Any kind of drugs", () => {
    it("should never have benefit value above 50", () => {
      given_a_pharmacy
        .with("Herbal Tea", 2, 50)
        .with("Fervex", 2, 49)
        .at_the_end_of_the_day()
        .should_have_many_drugs(
          new Drug("Herbal Tea", 1, 50),
          new Drug("Fervex", 1, 50)
        );
    });

    it("should never have a negative benefit", () => {
      given_a_pharmacy
        .with("normal drug", 2, 0)
        .at_the_end_of_the_day()
        .should_have_one_drug(1, 0);
    });
  });

  describe("A normal drug at the end of the day", () => {
    it("Should lowers expiresIn and benefit values by 1", () => {
      given_a_pharmacy
        .with("normal drug", 2, 3)
        .at_the_end_of_the_day()
        .should_have_one_drug(1, 2);
    });

    it("Should decrease benefit value twice as fast when expired", () => {
      given_a_pharmacy
        .with("normal drug", 0, 4)
        .at_the_end_of_the_day()
        .should_have_one_drug(-1, 2);
    });
  });

  describe("Herbal tea at the end of the day", () => {
    it("should increase in benefit by 1", () => {
      given_a_pharmacy
        .with("Herbal Tea", 2, 3)
        .at_the_end_of_the_day()
        .should_have_one_drug(1, 4);
    });

    it("should increase in benefit twice as fast when expired", () => {
      given_a_pharmacy
        .with("Herbal Tea", 0, 3)
        .at_the_end_of_the_day()
        .should_have_one_drug(-1, 5);
    });
  });

  describe("A magic pill at the end of the day", () => {
    it("should never expires nor decreases in benefit", () => {
      given_a_pharmacy
        .with("Magic Pill", 2, 5)
        .at_the_end_of_the_day()
        .should_have_one_drug(2, 5);
    });
  });

  describe("Fervex at the end of the day", () => {
    it("should increases benefit as its expiration date approaches", () => {
      given_a_pharmacy
        .with("Fervex", 11, 36)
        .at_the_end_of_the_day()
        .should_have_one_drug(10, 37);
    });

    it("should increase in benefit by 2 when there are 10 days or less", () => {
      given_a_pharmacy
        .with("Fervex", 10, 37)
        .at_the_end_of_the_day()
        .should_have_one_drug(9, 39);
    });

    it("should increase in benefit by 3 when there are 5 days or less", () => {
      given_a_pharmacy
        .with("Fervex", 5, 47)
        .at_the_end_of_the_day()
        .should_have_one_drug(4, 50);
    });

    it("should drop benefit to 0 when expired", () => {
      given_a_pharmacy
        .with("Fervex", 0, 50)
        .at_the_end_of_the_day()
        .should_have_one_drug(-1, 0);
    });
  });

  describe("Dafalgan at the end of the day", () => {
    it("should degrades in Benefit twice as fast as normal drugs", () => {
      given_a_pharmacy
        .with("Dafalgan", 1, 10)
        .with("Dafalgan", 0, 8)
        .at_the_end_of_the_day()
        .should_have_many_drugs(
          new Drug("Dafalgan", 0, 8),
          new Drug("Dafalgan", -1, 4)
        );
    });
  });
});

class PharmacyDSL {
  drugs = [];
  pharmacy;
  output;

  with(name, expiresIn, benefit) {
    this.drugs.push(new Drug(name, expiresIn, benefit));
    return this;
  }

  at_the_end_of_the_day() {
    this.pharmacy = new Pharmacy(this.drugs);
    this.output = this.pharmacy.updateBenefitValue();
    return this;
  }

  should_have_one_drug(expiresIn, benefit) {
    expect(this.output).toEqual([
      new Drug(this.drugs[0].name, expiresIn, benefit),
    ]);
  }

  should_have_many_drugs(...expectedDrugs) {
    expect(this.output).toEqual(expectedDrugs);
  }
}
