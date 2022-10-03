const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

// Метод, хеширует и солит пароль перед сохранением в базу
userSchema.pre("save", function () {
  if (this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
