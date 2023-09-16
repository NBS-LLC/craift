import expect from "expect";
import request from "supertest";
import app from "../../app";

describe("GET /api/treasure", function () {
  it("should return treasure data", async function () {
    const response = await request(app)
      .get("/api/treasure")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
  });
});
