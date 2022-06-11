const Post = require("../database/models/post.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const marked = require("marked");
const createDomPurifier = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurifier(new JSDOM().window);

const {
  getAllPosts,
  createPost,
  getOnePost,
  deletePost,
  updatePost,
  getPostsWithAuthor,
  getOnePostWithAuthor,
} = require("../queries/post.queries");

//multer config
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, path.join(__dirname, "../public/img/blog"));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

//getAllPosts controller find and return the whole list of articles in db
exports.postsList = async (req, res, next) => {
  try {
    const posts = await getPostsWithAuthor();
    req.user ? (currentUser = req.user) : (currentUser = null);
    res.render("blog/index", {
      posts,
      isAuthenticated: req.isAuthenticated(),
      currentUser,
      editable: true,
    });
  } catch (e) {
    next(e);
  }
};

exports.postById = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    req.user ? (currentUser = req.user) : (currentUser = null);
    const post = await getOnePostWithAuthor(slug);
    res.render("blog/post", {
      post,
      isAuthenticated: req.isAuthenticated(),
      currentUser,
      editable: true,
    });
  } catch (e) {
    next(e);
  }
};

//createNewArticle controller get request body and try to save new article in db, if it fails, it set error status and send errors object to page
exports.createNewPost = async (req, res, next) => {
  try {
    const body = req.body;
    await createPost({ ...body, author: req.user._id });
    res.redirect("/blog");
  } catch (e) {
    const errors = Object.keys(e.errors).map((k) => e.errors[k].message);
    res.status(400).render("blog/add-post", {
      errors,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};

//display new article creation form
exports.newPost = (req, res, next) => {
  res.render("blog/add-post", {
    post: {},
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user,
  });
};

exports.postEdit = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await getOnePost(postId);
    res.render("blog/add-post", {
      post,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (e) {
    next(e);
  }
};

exports.postUpdate = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const body = req.body;
    const sanitizedHtml = dompurify.sanitize(marked.parse(body.markdown));
    await updatePost(postId, {
      ...body,
      sanitizedHtml,
      updatedAt: moment().startOf("hour").fromNow(),
    });
    res.redirect("/blog");
  } catch (e) {
    const errors = Object.keys(e.erros).map((k) => e.errors[k].message);
    const post = await getOnePost(postId);
    res.status(400).render("/blog/add-article", {
      errors,
      post,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  }
};

exports.updateHeroImage = [
  upload.single("img"),
  async (req, res, next) => {
    try {
      const postId = req.params.postId;
      const post = await getOnePost(postId);
      post.img = `/img/blog/${req.file.filename}`;
      await post.save();
      res.redirect("/blog");
    } catch (e) {
      next(e);
    }
  },
];

exports.postDelete = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await getOnePost(postId);
    const filename = post.img.split("/img/blog/")[1];
    console.log();
    fs.unlink(`public/img/blog/${filename}`, async () => {
      await deletePost(postId);
    });
    const posts = await getPostsWithAuthor();
    res.render("blog/index", {
      posts,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
      editable: true,
    });
  } catch (e) {
    next(e);
  }
};
