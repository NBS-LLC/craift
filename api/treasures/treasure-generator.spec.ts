import { PredictionServiceClient, helpers } from "@google-cloud/aiplatform";
import chai, { assert } from "chai";
import { describe } from "mocha";
import { anything, capture, instance, mock, when } from "ts-mockito";
import { Treasure } from "./treasure";
import {
  TreasureGenerator,
  TreasurePredictionSchemaError,
} from "./treasure-generator";

chai.use(require("chai-as-promised"));

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

    it("should transform predictions into treasure objects", async function () {
      const treasure = new Treasure(
        "treasure name",
        "treasure description",
        100
      );
      treasure.addAttribute({ name: "damage", value: 10 });

      const mockService = mock(PredictionServiceClient);
      when(mockService.predict(anything())).thenResolve([
        mockPredictResponse(treasure),
        undefined,
        undefined,
      ]);

      const treasureGenerator = new TreasureGenerator(instance(mockService));
      const actualTreasure = await treasureGenerator.generateRandomTreasure();
      assert.deepEqual(actualTreasure, treasure);
    });

    it("should throw schema error on invalid property type", function () {
      const invalidTreasureData = {
        name: "treasure name",
        description: "treasure description",
        value: "100 Gold", // Invalid property type, should be a number
        attributes: [],
      };

      const mockService = mock(PredictionServiceClient);
      when(mockService.predict(anything())).thenResolve([
        mockPredictResponse(invalidTreasureData),
        undefined,
        undefined,
      ]);

      const treasureGenerator = new TreasureGenerator(instance(mockService));

      return assert.isRejected(
        treasureGenerator.generateRandomTreasure(),
        TreasurePredictionSchemaError
      );
    });

    it("should throw schema error on missing property", function () {
      const invalidTreasureData = {
        name: "treasure name",
        description: "treasure description",
        value: 100,
        // Missing the "attributes" property
      };

      const mockService = mock(PredictionServiceClient);
      when(mockService.predict(anything())).thenResolve([
        mockPredictResponse(invalidTreasureData),
        undefined,
        undefined,
      ]);

      const treasureGenerator = new TreasureGenerator(instance(mockService));

      return assert.isRejected(
        treasureGenerator.generateRandomTreasure(),
        TreasurePredictionSchemaError
      );
    });
  });
});

function mockPredictResponse(treasure: any) {
  const prediction = {
    content: JSON.stringify(treasure),
  };

  return {
    predictions: [helpers.toValue(prediction)!],
  };
}
