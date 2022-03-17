const router = require("express").Router();
const api = require("./api");
const Article = require("../database/models/article.model");

router.use("/api", api);

router.get("/", (req, res) => {
  res.render("pages/home");
});

router.get("/prestation", (req, res) => {
  res.render("pages/prestation");
});

router.get("/portfolio", (req, res) => {
  res.render("pages/portfolio");
});

router.get("/pourquoi", (req, res) => {
  res.render("pages/pourquoi");
});

router.get("/blog", (req, res) => {
  Article.find({})
    .exec()
    .then((articles) => res.render("pages/blog", { articles }));
});

router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

router.get("/blog/new", (req, res) => {
  res.render("pages/blog/add-article");
});

router.get("*", (req, res) => {
  res.render("pages/404");
});

module.exports = router;
