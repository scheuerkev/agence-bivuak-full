const express = require("express");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const path = require("path");
const index = require("./routes");
require("./database");
require("./bin/www");

const app = express();
module.exports = app;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

require("./config/session.config");
require("./config/passport.config");

//app.use(helmet());
app.use(cors());
app.use(morgan("short"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  mongoSanitize({
    replaceWith: "_",
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  })
);
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
