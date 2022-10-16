const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// ------ Отправка письма через nodemailer --------------
// const nodemailer = require("nodemailer");

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465, // 25, 465 и 2255
//   secure: true,
//   auth: {
//     user: "maxim050775@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// const email = {
//   to: "gixin10127@inkmoto.com",
//   from: "maxim050775@meta.ua",
//   subject: "Новая заявка с сайта",
//   html: "<p>С сайта пришла новая заявка<p/>",
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

// ----- Отправка письма через Sendgrid --------------
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
