const router = require("express").Router();
const blog = require("./blog.routes");
const users = require("./users.routes");
const auth = require("./auth.routes");

router.use("/blog", blog);
router.use("/users", users);
router.use("/auth", auth);

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
