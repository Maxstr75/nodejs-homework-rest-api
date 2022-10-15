// Отправка письма через Sendgrid
const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const email = {
  to: "gixin10127@inkmoto.com",
  from: "max057521@gmail.com",
  subject: "Новая заявка с сайта",
  html: "<p>С сайта пришла новая заявка<p/>",
};

sgMail
  .send(email)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));
