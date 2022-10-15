const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// const sgMail = require("@sendgrid/mail");

// const { SENDGRID_API_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_API_KEY);

// const email = {
//   to: "gixin10127@inkmoto.com",
//   from: "max057521@gmail.com",
//   subject: "Новая заявка с сайта",
//   html: "<p>С сайта пришла новая заявка<p/>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const { errorHandler } = require("./helpers/errorHandler");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
