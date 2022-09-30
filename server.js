const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("DataBase connect success");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// const app = require("./app");
// const db = require("./db");

// const { PORT = 3000 } = process.env;

// const start = async () => {
//   try {
//     await db();

//     app.listen(PORT, () => {
//       console.log(`Server running. Use our API on port ${PORT}`);
//     });
//   } catch (error) {
//     console.log(`Server not running. Error message: ${error.message}`);
//   }
// };

// start();
