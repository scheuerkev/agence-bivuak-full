const mongoose = require("mongoose");
const schema = mongoose.Schema;
const marked = require("marked");
const slugify = require("slugify");
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurifier(new JSDOM().window);

const postSchema = schema({
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
  markdown: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
    default: "univers.png",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
  author: {
    type: schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
});

postSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
  }

  next();
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
