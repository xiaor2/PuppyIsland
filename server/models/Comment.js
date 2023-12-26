import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  }
}, { timestamp: true });

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;