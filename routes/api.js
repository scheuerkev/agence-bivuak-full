const router = require("express").Router();
const articles = require("./api.articles");

router.use("/articles", articles);

module.exports = router;
