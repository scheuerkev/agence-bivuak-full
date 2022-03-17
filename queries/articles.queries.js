const Article = require("../database/models/article.model");

exports.getArticles = async () => {
  return Article.find({}).exec();
};

exports.createArticle = async (article) => {
  const newArticle = new Article(article);
  return newArticle.save();
};
