import { Treasure } from "./treasure";
import expect from "expect";

describe("Treasure", () => {
  describe("getAttributes()", () => {
    it("should return an empty array on initialization", () => {
      const treasure = new Treasure("sword", "an old sword", 5);
      expect(treasure.attributes).toEqual([]);
    });
  });

  describe("addAttribute()", () => {
    it("should add an attribute to the treasure", () => {
      const treasure = new Treasure("sword", "an old sword", 5);
      treasure.addAttribute({ name: "damage", value: 1 });
      expect(treasure.attributes).toEqual([{ name: "damage", value: 1 }]);
    });
  });
});
