const app = require("./app");
const db = require("./db");

const { PORT = 3000 } = process.env;
// const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await db();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port ${PORT}`);
    });
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
  }
};
