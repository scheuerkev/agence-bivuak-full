const Article = require("../database/models/article.model");
const {
  getArticles,
  createArticle,
  getArticle,
  deleteArticle,
  updateArticle,
} = require("../queries/articles.queries");

//getAllArticles controller find and return the whole list of articles in db
exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await getArticles();
    res.render("blog/blog", { articles });
  } catch (e) {
    next(e);
  }
};

//createNewArticle controller get request body and try to save new article in db, if it fails, it set error status and send errors object to page
exports.createNewArticle = async (req, res, next) => {
  try {
    const body = req.body;
    await createArticle(body);
    res.redirect("/blog");
    console.log("Here");
  } catch (e) {
    const errors = Object.keys(e.errors).map((k) => e.errors[k].message);
    res.status(400).render("blog/add-article", { errors });
  }
};

//display new article creation form
exports.articleNew = (req, res, next) => {
  res.render("blog/add-article", { article: {} });
};

exports.articleEdit = async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    const article = await getArticle(articleId);
    res.render("blog/add-article", { article });
  } catch (e) {
    next(e);
  }
};

exports.articleUpdate = async (req, res, next) => {
  const articleId = req.params.articleId;
  try {
    const body = req.body;
    await updateArticle(articleId, body);
    res.redirect("/blog");
  } catch (e) {
    const errors = Object.keys(e.erros).map((k) => e.errors[k].message);
    const article = await getArticle(articleId);
    res.status(400).render("/blog/add-article", { errors, article });
  }
};

exports.articleDelete = async (req, res, next) => {
  try {
    const articleId = req.params.articleId;
    await deleteArticle(articleId);
    const articles = await getArticles();
    res.render("blog/blog", { articles });
  } catch (e) {
    next(e);
  }
};
