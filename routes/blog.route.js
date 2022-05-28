const router = require("express").Router();
const { ensureAuthenticated, isAdmin } = require("../config/guards.config");

const {
  postsList,
  postById,
  createNewPost,
  newPost,
  postUpdate,
  updateHeroImage,
  postEdit,
  postDelete,
} = require("../controllers/post.controller");

router.get("/", postsList);

router.get("/new", ensureAuthenticated, isAdmin, newPost);
router.post("/", ensureAuthenticated, isAdmin, createNewPost);
router.get("/:slug", postById);

router.delete("/:postId", postDelete);
router.post(
  "/update/img/:postId",
  ensureAuthenticated,
  isAdmin,
  updateHeroImage
);
router.get("/edit/:postId", postEdit);
router.post("/update/:postId", postUpdate);

module.exports = router;
