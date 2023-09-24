import { PredictionServiceClient } from "@google-cloud/aiplatform";
import { Treasure } from "./treasure";
import { TreasureGenerator } from "./treasure-generator";

export async function getRandomTreasure(): Promise<Treasure> {
  const predictionService = new PredictionServiceClient({
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
  });

  // TODO: Use dependency injection to allow for mocking

  const treasureGenerator = new TreasureGenerator(predictionService);
  return await treasureGenerator.generateRandomTreasure();
}
