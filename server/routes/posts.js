import express from 'express';
import { getFeedPosts, getUserPosts, likePost, getPost} from "../controllers/posts.js"
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Read
router.get("/", verifyToken, getFeedPosts)
router.get("/:postId", verifyToken, getPost)
router.get("/:userId/posts", verifyToken, getUserPosts)

// Update
router.patch("/:id/like", verifyToken, likePost)

export default router;
