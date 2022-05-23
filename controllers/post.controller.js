const Post = require("../database/models/post.model");
const multer = require("multer");
const path = require("path");
const moment = require("moment");

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
    filename: (req, res, cb) => {
      cb(null, `${Date.now()}-${file.originalName}`);
    },
  }),
});

//getAllPosts controller find and return the whole list of articles in db
exports.postsList = async (req, res, next) => {
  try {
    const posts = await getPostsWithAuthor();
    res.render("blog/index", {
      posts,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (e) {
    next(e);
  }
};

exports.postById = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const post = await getOnePostWithAuthor(slug);
    res.render("blog/post", {
      post,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
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
    article: {},
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
    await updatePost(postId, body);
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

exports.updateHeroImage = (req, res, next) => {};

exports.postDelete = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    await deletePost(postId);
    const posts = await getAllPosts();
    res.render("blog/blog", {
      posts,
      isAuthenticated: req.isAuthenticated(),
      currentUser: req.user,
    });
  } catch (e) {
    next(e);
  }
};
