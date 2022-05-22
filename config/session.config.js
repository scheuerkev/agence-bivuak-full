const app = require("../app");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    store: MongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@agencebivuak.sgg6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      ttl: 60 * 60 * 24 * 14,
    }),
  })
);
