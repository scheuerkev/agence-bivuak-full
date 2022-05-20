const Post = require("../database/models/post.model");

exports.getAllPosts = () => {
  return Post.find({}).exec();
};

exports.getOnePost = (slug) => {
  return Post.findOne({ slug: slug }).exec();
};

exports.createPost = (post) => {
  const newPost = new Post(post);
  return newPost.save();
};

exports.deletePost = (postId) => {
  return Post.findByIdAndDelete(postId).exec();
};

exports.updatePost = (postId, post) => {
  return Post.findByIdAndUpdate(
    postId,
    { $set: post },
    { runValidators: true }
  );
};
