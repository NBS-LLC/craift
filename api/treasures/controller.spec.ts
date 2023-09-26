import { assert } from "chai";
import { instance, mock, when } from "ts-mockito";
import { TreasureController } from "./controller";
import { Treasure } from "./treasure";
import { TreasureGenerator } from "./treasure-generator";

describe("TreasureController", function () {
  describe("getRandomTreasure()", function () {
    it("should return a treasure object", async function () {
      const treasure = new Treasure(
        "unit test treasure",
        "unit test description",
        10
      );

      const mockTreasureGenerator = mock(TreasureGenerator);
      when(mockTreasureGenerator.generateRandomTreasure()).thenResolve(
        treasure
      );

      const controller = new TreasureController(
        instance(mockTreasureGenerator)
      );

      assert.deepEqual(await controller.getRandomTreasure(), treasure);
    });
  });
});
