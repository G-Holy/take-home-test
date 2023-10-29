import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  describe("Given a normal drug at the end of the day", () => {
    it("Should lowers expiresIn and benefit values by 1", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
      ).toEqual([new Drug("test", 1, 2)]);
    });
  });
});
