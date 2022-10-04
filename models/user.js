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

// Хук, хеширует и солит пароль перед сохранением в базу
userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  // this.password = hash;
  next();
  // if (this.isNew) {
  //   this.password = bcrypt.hashSync(this.password, 10);
  // }
});

// Сравнивает пароли при входе юзера (возвращает null если не совпадают)
userSchema.methods.validPassword = function (password) {
  const result = bcrypt.compareSync(password, this.password);
  return result;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
