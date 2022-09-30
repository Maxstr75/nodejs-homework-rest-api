const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Set name for contact!"],
    },
    email: {
      type: String,
      require: [true, "Email is required!"],
    },
    phone: {
      type: String,
      require: [true, "Phone is required!"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
