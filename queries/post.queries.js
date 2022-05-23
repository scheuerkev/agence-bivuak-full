const Post = require("../database/models/post.model");

exports.getAllPosts = () => {
  return Post.find({}).sort({ createdAt: "desc" }).exec();
};

exports.getOnePost = (postId) => {
  return Post.findById(postId).exec();
}

exports.getOnePostWithAuthor = (slug) => {
  return Post.findOne({ slug: slug }).populate("author").exec();
};

exports.createPost = (post) => {
  const newPost = new Post(post);
  console.log("in query");
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

exports.getPostsWithAuthor = () => {
  return Post.find({}).populate("author").sort({ createdAt: "desc" }).exec();
};
