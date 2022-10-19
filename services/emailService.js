// ---------- Отправка письма через nodemailer -------------------
const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465 и 2255
  secure: true,
  auth: {
    user: "maxim050775@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = {
  to: "gixin10127@inkmoto.com",
  from: "maxim050775@meta.ua",
  subject: "Подтверждение email",
  html: `<a href= "http://localhost:3000/api/users/verify/verificationToken"> Подтвердить email</a>`,
};

transporter
  .sendMail(sendEmail)
  .then(() => console.log("Email send success"))
  .catch((error) => console.log(error.message));

// -------- Отправка письма через Sendgrid -----------
// const sgMail = require("@sendgrid/mail");

// const { SENDGRID_API_KEY } = process.env;
// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//   const email = { ...data, from: "max057521@gmail.com" };
//   // eslint-disable-next-line no-useless-catch
//     await sgMail.send(email);
//     return true;
// };
module.exports = sendEmail;
