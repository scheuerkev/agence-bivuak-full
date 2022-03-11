const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("pages/home");
});

router.get("/prestation", (req, res) => {
  res.render("pages/prestation");
});

router.get("/portfolio", (req, res) => {
  res.render("pages/portfolio");
});

router.get("/stack", (req, res) => {
  res.render("pages/stack");
});

router.get("/blog", (req, res) => {
  res.render("pages/blog");
});

router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

router.get("*", (req, res) => {
  res.render("pages/404");
});

module.exports = router;
