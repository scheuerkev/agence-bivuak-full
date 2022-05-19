const router = require("express").Router();
const blog = require("./blog");
const message = require("./messages.route");

router.use("/blog", blog);
router.use("/message", message);

router.get("/mentions-legales", (req, res) => {
  res.render("pages/mentions-legales");
});

router.get("*", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
