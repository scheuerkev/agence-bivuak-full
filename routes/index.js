const router = require("express").Router();
const blog = require("./blog");
const message = require("./messages.route");

router.use("/blog", blog);
router.use("/message", message);

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

router.get("/contact", (req, res) => {
  res.render("pages/contact");
});

router.get("*", (req, res) => {
  res.render("pages/404");
});

module.exports = router;
