const router = require("express").Router();
const { ensureAuthenticated, isAdmin } = require("../config/guards.config");

const {
  postsList,
  postById,
  createNewPost,
  newPost,
  postUpdate,
  postEdit,
  postDelete,
} = require("../controllers/post.controller");

router.get("/", postsList);

router.get("/new", ensureAuthenticated, newPost);
router.post("/", ensureAuthenticated, isAdmin, createNewPost);
router.get("/:slug", postById);

router.delete("/:postId", postDelete);
router.post("/update/:postId", postUpdate);
router.get("/edit/:postId", postEdit);

module.exports = router;
