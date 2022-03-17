const router = require("express").Router();
const Article = require("../database/models/article.model");

router.post("/", (req, res) => {
  const body = req.body;
  const newArticle = new Article(body);
  newArticle
    .save()
    .then((newArticle) => res.redirect("/"))
    .catch((err) => {
      const errors = Object.keys(err.errors).map((k) => err.errors[k].message);
      res.status(400).render("pages/blog/add-article", { errors });
    });
});

module.exports = router;
