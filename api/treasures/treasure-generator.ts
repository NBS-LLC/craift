import { Treasure } from "./treasure";

export class TreasureGenerator {
  generateRandomTreasure(): Treasure {
    // TODO: make call to generative treasure AI
    const treasure = new Treasure("sword", "an old sword", 5);
    treasure.addAttribute({ name: "damage", value: 1 });
    return treasure;
  }
}
