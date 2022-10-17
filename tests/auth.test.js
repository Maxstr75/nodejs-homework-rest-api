const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

describe("tests for login controller/signup", () => {
  beforeAll(() =>
    mongoose
      .connect(DB_HOST)
      .then(() => {
        console.log("database connection successful");
        app.listen(PORT, () => {
          console.log(`Server running. Use our API on port: ${PORT}`);
        });
      })
      .catch((error) => {
        console.log(`Server is not running. Error message: ${error.message}`);
        process.exit(1);
      })
  );
  it("login returns response should have status code 200 and the response body should return a token", async () => {
    const response = await request(app).post("/api/users/login").send({
      email: "maxim789@gmail.com",
      password: "Max785@",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe("string");
  });
  it("signup returns a user object with 2 fields email and subscription, both of data type String", async () => {
    const response = await request(app).post("/api/users/signup").send({
      email: "max057521@gmail.com",
      password: "Maxim1975@",
    });
    expect(response.status).toBe(201);
    expect(response.body.email).toBe("string");
    expect(response.body.subscription).toBe("string");
  });
});
