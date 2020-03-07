const request = require("supertest");
const app = require("../app");

describe("Games API", () => {
  it("Should get all records", async done => {
    const db = '';
    const response = await request(app).get("/api/games");
    console.log(app);
    expect(response.statusCode).toBe(200);
    done();
  });
});
