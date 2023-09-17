import expect from "expect";
import request from "supertest";
import app from "../../app";

describe("GET /api/treasures/random", function () {
  it("should return random treasure data", async function () {
    const response = await request(app)
      .get("/api/treasures/random")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    // TODO: validate response schema matches Treasure schema
  });
});
