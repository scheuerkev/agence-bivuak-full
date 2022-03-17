const Article = require("../database/models/article.model");

//getAllArticles controller find and return the whole list of articles in db
exports.getAllArticles = async (req, res, next) => {
  try {
    Article.find({})
      .exec()
      .then((articles) => res.render("blog/blog", { articles }));
  } catch (e) {
    next(e);
  }
};

//createNewArticle controller get request body and try to save new article in db, if it fails, it set error status and send errors object to page
exports.createNewArticle = async (req, res, next) => {
  try {
    const body = req.body;
    const newArticle = new Article(body);
    await newArticle.save();
  } catch (e) {
    const errors = Object.keys(e.errors).map((k) => e.errors[k].message);
    res.status(400).render("blog/add-article", { errors });
  }
};

//display new article form
exports.articleNew = (req, res, next) => {
  res.render("blog/add-article");
};
