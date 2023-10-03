import { PredictionServiceClient } from "@google-cloud/aiplatform";
import { assert } from "chai";
import { describe } from "mocha";
import { capture, instance, mock } from "ts-mockito";
import { TreasureGenerator } from "./treasure-generator";

describe(TreasureGenerator.name, function () {
  describe("generateRandomTreasure()", function () {
    it("should request a prediction", async function () {
      const mockService = mock(PredictionServiceClient);
      const treasureGenerator = new TreasureGenerator(instance(mockService));

      try {
        await treasureGenerator.generateRandomTreasure();
      } catch {}

      const [request] = capture(mockService.predict).last();

      assert.match(
        request.endpoint!,
        /^projects\/\S+\/locations\/\S+\/publishers\/google\/models\/\S+$/,
        "endpoint"
      );

      assert.nestedProperty(
        request.instances![0],
        "structValue.fields.content",
        "instances"
      );

      const expectedParameters = [
        "candidateCount",
        "maxOutputTokens",
        "temperature",
        "topP",
        "topK",
      ];

      expectedParameters.forEach(function (parameter) {
        assert.nestedProperty(
          request.parameters,
          `structValue.fields.${parameter}`,
          "parameters"
        );
      });
    });
  });
});
