const router = require("express").Router();
const blog = require("./blog.route");
const message = require("./messages.route");

router.use("/blog", blog);
router.use("/message", message);

router.get("*", (req, res) => {
  res.render("pages/index");
});

module.exports = router;
