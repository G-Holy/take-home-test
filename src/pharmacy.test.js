import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Given any kind of drugs", () => {
    it("should never have benefit value above 50", () => {
      expect(
        new Pharmacy([
          new Drug("Herbal Tea", 2, 50),
          new Drug("Fervex", 2, 50),
        ]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", 1, 50), new Drug("Fervex", 1, 50)]);
    });
  });

  describe("Given a normal drug at the end of the day", () => {
    it("Should lowers expiresIn and benefit values by 1", () => {
      expect(
        new Pharmacy([new Drug("normal drug", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("normal drug", 1, 2)]);
    });

    it("Should decrease benefit value twice as fast when expired", () => {
      expect(
        new Pharmacy([new Drug("normal drug", 0, 4)]).updateBenefitValue()
      ).toEqual([new Drug("normal drug", -1, 2)]);
    });
  });

  describe("Given herbal tea at the end of the day", () => {
    it("should increase in benefit by 1", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", 1, 4)]);
    });

    it("should increase in benefit twice as fast when expired", () => {
      expect(
        new Pharmacy([new Drug("Herbal Tea", 0, 3)]).updateBenefitValue()
      ).toEqual([new Drug("Herbal Tea", -1, 5)]);
    });
  });

  describe("Given a magic pill", () => {
    it("should never expires nor decreases in benefit", () => {
      expect(
        new Pharmacy([new Drug("Magic Pill", 2, 5)]).updateBenefitValue()
      ).toEqual([new Drug("Magic Pill", 2, 5)]);
    });
  });

  describe("Given fervex", () => {
    it("should increases benefit as its expiration date approaches", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 11, 36)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 10, 37)]);
    });

    it("should increases in benefit by 2 when there are 10 days or less", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 10, 37)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 9, 39)]);
    });

    it("should increases benefit by 3 when there are 5 days or less", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 5, 47)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", 4, 50)]);
    });

    it("should drops benefit to 0 when expired", () => {
      expect(
        new Pharmacy([new Drug("Fervex", 0, 50)]).updateBenefitValue()
      ).toEqual([new Drug("Fervex", -1, 0)]);
    });
  });
});