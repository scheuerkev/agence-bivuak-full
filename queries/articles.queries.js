const Article = require("../database/models/article.model");

exports.getArticles = () => {
  return Article.find({}).exec();
};

exports.getArticle = (articleId) => {
  return Article.findOne({ _id: articleId }).exec();
};

exports.createArticle = (article) => {
  const newArticle = new Article(article);
  return newArticle.save();
};

exports.deleteArticle = (articleId) => {
  return Article.findByIdAndDelete(articleId).exec();
};

exports.updateArticle = (articleId, article) => {
  return Article.findByIdAndUpdate(
    articleId,
    { $set: article },
    { runValidators: true }
  );
};
