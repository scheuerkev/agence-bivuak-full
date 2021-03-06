const express = require("express");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const helmet = require("helmet");
const path = require("path");
const index = require("./routes");
require("./database");
require("./bin/www");

const app = express();

module.exports = app;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//app.use(helmet());
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(index);

if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message,
    });
  });
}
