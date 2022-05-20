const router = require("express").Router();

const {
  postsList,
  postById,
  createNewPost,
  newPost,
  postUpdate,
  postEdit,
  postDelete,
} = require("../controllers/post.controller");

router.get("/new", newPost); //protect this route
router.get("/", postsList);
router.get("/edit/:postId", postEdit);
router.get("/:slug", postById);
router.delete("/:postId", postDelete);
router.post("/update/:articleId", postUpdate);
router.post("/", createNewPost);

module.exports = router;
