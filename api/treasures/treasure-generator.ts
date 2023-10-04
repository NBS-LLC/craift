import { PredictionServiceClient, helpers } from "@google-cloud/aiplatform";
import { Treasure } from "./treasure";

export class TreasureGenerator {
  static create() {
    const predictionService = new PredictionServiceClient({
      apiEndpoint: "us-central1-aiplatform.googleapis.com",
    });

    return new TreasureGenerator(predictionService);
  }

  constructor(private predictionService: PredictionServiceClient) {}

  async generateRandomTreasure(): Promise<Treasure> {
    const [response] = await this.predictionService.predict(
      this.predictionRequest
    );

    if (!response.predictions || response.predictions.length === 0) {
      throw new Error("Failed to generate treasure.");
    }

    const prediction = response.predictions[0];
    const json = JSON.parse(
      prediction.structValue!.fields!.content!.stringValue!
    );

    // TODO: Validate prediction data structure

    const treasure = new Treasure(json.name, json.description, json.value);
    for (const attribute of json.attributes) {
      treasure.addAttribute({ name: attribute.name, value: attribute.value });
    }

    return treasure;
  }

  private get predictionRequest() {
    return {
      endpoint: this.predictionEndpoint,
      instances: [helpers.toValue(this.predictionExamples)!],
      parameters: helpers.toValue(this.predictionParams)!,
    };
  }

  private get predictionEndpoint() {
    const projectId = process.env["CRAIFT_AI_PROJECT_ID"];
    const location = "us-central1";
    const model = "text-bison@001";

    return `projects/${projectId}/locations/${location}/publishers/google/models/${model}`;
  }

  private get predictionExamples() {
    return {
      content: `
            Generate random treasure details in a structured JSON format. The format must include name, enhancements (an array) and a description. The description should be at least 5 sentences long and include a detailed visual description and some creative lore.
            input: A magical amulet that grants +1 intelligence.
            output: {
                "name": "Amulet of Secrets",
                "description": "All worlds hold weird secrets. With this, you know a few of them. An amulet with a mysterious glow and hum if held to the ear. The amulet vibrates in anticipation of questions about the hidden truths.",
                "value": 1000,
                "attributes": [
                    {
                        "name": "intelligence",
                        "value": 1
                    },
                    {
                        "name": "wisdom",
                        "value": 1
                    }
                ]
            }
            
            input: A spiritual trinket that grants +1 WIS
            output: {
                "name": "Meditation Beads",
                "description": "By counting the beads, the mind settles. Senses heighten, intuition improves. An intricate set of dark wooden beads. Perhaps passed down from generation to generation. Their wear speaks to the amount of use these beads have seen over the decades.",
                "value": 800,
                "attributes": [
                    {
                        "name": "wisdom",
                        "value": 1
                    }
                ]
            }
            
            input: A random piece of magical treasure
            output:
            `,
    };
  }

  private get predictionParams() {
    return {
      candidateCount: 1,
      maxOutputTokens: 256,
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
    };
  }
}
