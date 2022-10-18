const request = require("supertest");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("../app");
const { User } = require("../models/user");

const { DB_HOST, PORT = 3000 } = process.env;

describe("tests for login controller/signup", () => {
  let server;
  beforeAll(
    () =>
      (server = app.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
      }))
  );
  afterAll(() =>
    server.close(PORT, () => {
      console.log(`Server closing. Use our API on port: ${PORT}`);
    })
  );

  beforeEach(() => {
    mongoose.connect(DB_HOST).then(() => {
      console.log("database connection successful");
      app.listen(PORT, () => {
        console.log(`Server running. Use our API on port: ${PORT}`);
      });
    });
    afterEach(() => {
      mongoose.connection.db.dropCollection(() => {
        mongoose.connection.close(
          () => PORT,
          () => {
            console.log(`Server closing. Use our API on port: ${PORT}`);
          }
        );
      });
    });
    it("login returns response should have status code 200 and the response body should return a token and user object with 2 fields email and subscription, both of data type String", async () => {
      const newUser = {
        email: "maxim789@gmail.com",
        password: "Max785@",
      };
      const user = await User.create(newUser);

      const loginUser = {
        email: "maxim789@gmail.com",
        password: "Max785@",
      };

      const response = await request(app)
        .post("/api/users/login")
        .send(loginUser);
      expect(response.statusCode).toBe(200);
      const { body } = response;
      expect(body.token).toByTruthy();
      const { token } = await User.findById(user._id);
      expect(body.token).toBe(token);
      expect(body.email).toByTruthy();
      const { email } = await User.findOne(user.email);
      expect(body.email).toBe(email);
      expect(body.subscription).toByTruthy();
      const { subscription } = await User.findOne(user.id, user.subscription);
      expect(body.subscription).toBe(subscription);
    });
  });
});
