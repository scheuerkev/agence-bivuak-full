const Post = require("../database/models/post.model");
const {
  getAllPosts,
  createPost,
  getOnePost,
  deletePost,
  updatePost,
} = require("../queries/post.queries");

//getAllPosts controller find and return the whole list of articles in db
exports.postsList = async (req, res, next) => {
  try {
    const posts = await getAllPosts();
    res.render("blog/index", { posts });
  } catch (e) {
    next(e);
  }
};

exports.postById = async (req, res, next) => {
  try {
    const slug = req.params.slug;
    const post = await getOnePost(slug);
    res.render("blog/post", { post });
  } catch (e) {
    next(e);
  }
};

//createNewArticle controller get request body and try to save new article in db, if it fails, it set error status and send errors object to page
exports.createNewPost = async (req, res, next) => {
  try {
    const body = req.body;
    await createPost(body);
    res.redirect("/blog");
    console.log("in try controller");
  } catch (e) {
    //const errors = Object.keys(e.errors).map((k) => e.errors[k].message);
    console.log(e);
    res.status(400).render("blog/add-post");
  }
};

//display new article creation form
exports.newPost = (req, res, next) => {
  res.render("blog/add-post", { article: {} });
};

exports.postEdit = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const post = await getOnePost(postId);
    res.render("blog/add-article", { post });
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
    res.status(400).render("/blog/add-article", { errors, post });
  }
};

exports.postDelete = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    await deletePost(postId);
    const posts = await getAllPosts();
    res.render("blog/blog", { posts });
  } catch (e) {
    next(e);
  }
};
