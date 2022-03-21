const router = require("express").Router();
const {
  createNewArticle,
  getAllArticles,
  articleNew,
  articleEdit,
  articleUpdate,
  articleDelete,
} = require("../controllers/blog.controllers");

router.get("/new", articleNew);
router.get("/", getAllArticles);
router.get("/edit/:articleId", articleEdit);
router.delete("/:articleId", articleDelete);
router.post("/update/:articleId", articleUpdate);
router.post("/", createNewArticle);

module.exports = router;
