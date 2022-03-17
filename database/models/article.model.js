const mongoose = require("mongoose");
const schema = mongoose.Schema;

const articleSchema = schema({
  title: {
    type: String,
    minlength: [1, "Titre trop court"],
    required: [true, "Titre requis"],
  },
  content: {
    type: String,
    minlength: [1, "Contenu trop court"],
    required: [true, "Contenu requis"],
  },
});

const Article = mongoose.model("article", articleSchema);

module.exports = Article;
