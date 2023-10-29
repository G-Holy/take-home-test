import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
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
});
