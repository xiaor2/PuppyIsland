import Post from "../models/Post.js";
// import User from "../models/User.js";
import Comment from "../models/Comment.js";

// Create 
export const createComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const { userId, comment } = req.body;
    const newComment = new Comment()
    newComment.content = comment
    post.comments.push(newComment)
    // newAuthor = User.findById(userId)
    newComment.author = userId
    await newComment.save()
    await post.save()
    const newPost = await Post.find();
    res.status(200).json(newPost)
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
}

// Delete
export const deleteComment = async (req, res) => {
  try {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
  } catch (err) {
    res.status(204).json({ message: err.message })
  }
}