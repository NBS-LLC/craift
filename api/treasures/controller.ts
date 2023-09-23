import { Treasure } from "./treasure";
import { TreasureGenerator } from "./treasure-generator";

export function getRandomTreasure(): Treasure {
  const treasureGenerator = new TreasureGenerator();
  return treasureGenerator.generateRandomTreasure();
}
