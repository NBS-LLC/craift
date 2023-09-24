import expect from "expect";
import { getRandomTreasure } from "./controller";
import { Treasure } from "./treasure";

describe("getRandomTreasure", function () {
  it("should return a treasure object", async function () {
    expect(await getRandomTreasure()).toBeInstanceOf(Treasure);
  });
});
