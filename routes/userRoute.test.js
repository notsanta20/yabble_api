const request = require("supertest");
const userRoute = require("./userRoute");

describe("Test users route", () => {
  test("should respond with status code 200", async () => {
    const res = await request(userRoute).get("/users");
    expect(res.statusCode).toBe(200);
  });

  test("should return data containing array", async () => {
    const res = await request(userRoute).get("/users");
    expect(res.data).toContainArray;
  });
});
