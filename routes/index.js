const router = require("express").Router();
const blog = require("./blog.route");
const message = require("./messages.route");

router.use("/blog", blog);
router.use("/message", message);
router.use("/users", users);
router.use("/auth", auth);

router.get("/mentions-legales", (req, res) => {
  res.render("pages/mentions-legales");
});

router.get("*", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
