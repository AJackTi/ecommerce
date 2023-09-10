const app = require("./src/app");
const {
  app: { port: PORT },
} = require("./src/configs/config.mongodb");

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`Exit Server Express`));
});
