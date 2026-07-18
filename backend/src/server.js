const app = require("./app");
const env = require("./config/env");
const connectDB = require("./database/connectDB");

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });
};

startServer();