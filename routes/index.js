const router = require("express").Router();
const blog = require("./blog.route");
const message = require("./messages.route");
const users = require("./users.route");
const auth = require("./auth.route");

router.use("/blog", blog);
router.use("/message", message);
router.use("/users", users);
router.use("/auth", auth);

router.get("/mentions-legales", (req, res) => {
  res.render("pages/mentions-legales", {
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
});

router.get("*", (req, res) => {
  res.render("pages/index", {
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
});

module.exports = router;
