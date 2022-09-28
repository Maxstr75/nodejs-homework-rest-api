// Файл для подключения к БД
const mongoose = require("mongoose");
const uriDb = process.env.DB_HOST; // идентификатор  ресурса.

// Подключение к БД
const db = async () => {
  return await mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

// Консолит подключения к базе
mongoose.connection.on("connected", (_) => {
  console.log("Database connection successful");
});

// Обработка ошибки при коннекте
mongoose.connection.on("error", (err) => {
  console.error(`Database connection error: ${err.code}`);
});

// Консолит отключения от базе
mongoose.connection.on("disconnected", (_) => {
  console.log("Database disconnected");
});

// Отключение от базы при событии SIGINT (ctrl + C)
process.on("SIGINT", async () => {
  console.info(
    "\x1b[36m%s\x1b[0m",
    "Connection for DB disconnected and app terminated"
  );
  process.exit(1);
});

module.exports = db;
