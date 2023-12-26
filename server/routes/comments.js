import express from 'express';
// import { getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js"
import { createComment, deleteComment } from "../controllers/comment.js"
import { verifyToken } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

// Create
router.post("/", verifyToken, createComment)

// Delete
router.delete("/:commentId", verifyToken, deleteComment)

export default router;