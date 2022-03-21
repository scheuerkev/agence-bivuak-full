require("dotenv").config();
const mongoose = require("mongoose");

exports.clientPromise = mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@agencebivuak.sgg6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => console.log("Successfully connect to db"))
  .catch((err) => console.log("Unable to connect to db: ", err));
