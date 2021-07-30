const request = require("supertest");
const app = require("../../app");

describe("Integration test: set van status", () => {
  let agent = request.agent(app);
  let vanName = "Test";
  let token = "";
  vanDetails = null;
  beforeAll(async () => {
    await agent
      .post("/api/van/login")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .send({
        vanName: "Test",
        password: "Password1",
      })
      .then((response) => {
        token = response.body["token"];
      });
    await agent
      .get("/api/van/vanDetails")
      .set("vanAuthorization", `Bearer ${token}`)
      .set("vanName", vanName)
      .set("Content-Type", "application/json")
      .then((response) => {
        vanDetails = response.body;
      });
  });

  test("Test 1: Set van status to open", async () => {
    const newVanDetails = JSON.parse(JSON.stringify(vanDetails));
    newVanDetails.readyForOrders = true;
    const response = await agent
      .post("/api/van/setStatus")
      .send(newVanDetails)
      .set("vanAuthorization", `Bearer ${token}`)
      .set("vanName", vanName)
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.readyForOrders).toBe(true);
    expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Test 2: Set van status to closed", async () => {
    const newVanDetails = JSON.parse(JSON.stringify(vanDetails));
    newVanDetails.readyForOrders = false;
    const response = await agent
      .post("/api/van/setStatus")
      .send(newVanDetails)
      .set("vanAuthorization", `Bearer ${token}`)
      .set("vanName", vanName)
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.readyForOrders).toBe(false);
    expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Test 3: Set van location description", async () => {
    const newVanDetails = JSON.parse(JSON.stringify(vanDetails));
    const newDescription = Math.random().toString()
    newVanDetails.locationDescription = newDescription;
    const response = await agent
      .post("/api/van/setStatus")
      .send(newVanDetails)
      .set("vanAuthorization", `Bearer ${token}`)
      .set("vanName", vanName)
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.locationDescription).toBe(newDescription);
    expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Test 4: Set van location", async () => {
    const newVanDetails = JSON.parse(JSON.stringify(vanDetails));
    const newLongitude = 144 + Math.random()
    const newLatitude = -37 + Math.random()
    newVanDetails.longitude = newLongitude;
    newVanDetails.latitude = newLatitude;
    const response = await agent
      .post("/api/van/setStatus")
      .send(newVanDetails)
      .set("vanAuthorization", `Bearer ${token}`)
      .set("vanName", vanName)
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.longitude).toBe(newLongitude);
    expect(response.body.latitude).toBe(newLatitude);
    expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("Test 4: Set invalid van location", async () => {
    const newVanDetails = JSON.parse(JSON.stringify(vanDetails));
    const newLongitude = 180.1
    const newLatitude = -37;
    newVanDetails.longitude = newLongitude;
    newVanDetails.latitude = newLatitude;
    const response = await agent
      .post("/api/van/setStatus")
      .send(newVanDetails)
      .set("vanAuthorization", `Bearer ${token}`)
      .set("vanName", vanName)
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(404);
  });
});
