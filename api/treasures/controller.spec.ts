import expect from "expect";
import { TreasureController } from "./controller";
import { Treasure } from "./treasure";

describe("getRandomTreasure", function () {
  it("should return a treasure object", async function () {
    this.timeout(10000);

    const controller = TreasureController.create();
    expect(await controller.getRandomTreasure()).toBeInstanceOf(Treasure);
  });
});
