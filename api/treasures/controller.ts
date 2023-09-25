import { PredictionServiceClient } from "@google-cloud/aiplatform";
import { Treasure } from "./treasure";
import { TreasureGenerator } from "./treasure-generator";

export class TreasureController {
  static create() {
    // TODO: Use dependency injection

    const predictionService = new PredictionServiceClient({
      apiEndpoint: "us-central1-aiplatform.googleapis.com",
    });
    const treasureGenerator = new TreasureGenerator(predictionService);
    return new TreasureController(treasureGenerator);
  }

  constructor(private treasureGenerator: TreasureGenerator) {}

  async getRandomTreasure(): Promise<Treasure> {
    return await this.treasureGenerator.generateRandomTreasure();
  }
}
