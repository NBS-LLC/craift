import chai, { assert } from "chai";
import expect from "expect";
import request from "supertest";
import app from "../../app";
import treasureSchema from "./treasure.schema.json";

describe("GET /api/treasures/random", function () {
  it("should return random treasure data", async function () {
    if (process.env.CI === "true") {
      // TODO: Configure CI for integration tests (#8)
      this.skip();
    }

    this.timeout(10000);

    const response = await request(app)
      .get("/api/treasures/random")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);

    chai.use(require("chai-json-schema"));
    assert.jsonSchema(response.body, treasureSchema);
  });
});
