const path = require("path");

module.exports = {
  cert: path.join(__dirname, "../ssl/localhost.crt"),
  key: path.join(__dirname, "../ssl/localhost.key"),
  portHttp: 3000,
  portHttps: 3001,
};
