import { PredictionServiceClient } from "@google-cloud/aiplatform";
import { Treasure } from "./treasure";
import { TreasureGenerator } from "./treasure-generator";

export class TreasureController {
  static create() {
    return new TreasureController(TreasureGenerator.create());
  }

  constructor(private treasureGenerator: TreasureGenerator) {}

  async getRandomTreasure(): Promise<Treasure> {
    return await this.treasureGenerator.generateRandomTreasure();
  }
}
