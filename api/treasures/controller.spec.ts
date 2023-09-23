import expect from "expect";
import { getRandomTreasure } from "./controller";
import { Treasure } from "./treasure";

describe("getRandomTreasure", function () {
  it("should return a treasure object", function () {
    expect(getRandomTreasure()).toBeInstanceOf(Treasure);
  });
});
