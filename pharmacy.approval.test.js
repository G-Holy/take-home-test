import outputSnapshot from "./output.snapshot.json";
import { Pharmacy } from "./src/aggregates/pharmacy";
import { Drug } from "./src/entities/drugs/drug";

describe("Pharmacy", () => {
  it("Should generate same output as the valid snapshot", async () => {
    const drugs = [
      new Drug("Doliprane", 20, 30),
      new Drug("Herbal Tea", 10, 5),
      new Drug("Fervex", 12, 35),
      new Drug("Magic Pill", 15, 40),
    ];
    const pharmacy = new Pharmacy(drugs);

    const log = [];

    for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
      log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
    }

    const output = JSON.parse(
      JSON.stringify({ result: log }, null, 2).concat("\n")
    );
    expect(output).toEqual(outputSnapshot);
  });
});
