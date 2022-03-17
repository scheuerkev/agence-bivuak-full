const router = require("express").Router();
const {
  createNewArticle,
  getAllArticles,
  articleNew,
} = require("../controllers/blog");

router.get("/new", createNewArticle);
router.get("/", getAllArticles);
router.post("/", articleNew);

module.exports = router;
