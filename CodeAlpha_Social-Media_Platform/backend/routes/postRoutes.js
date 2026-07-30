const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  getPostsByUser,
} = require("../controllers/postController");

router.post("/", auth, createPost);
router.get("/", auth, getAllPosts);
router.get("/user/:userId", auth, getPostsByUser);
router.get("/:id", auth, getPostById);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.post("/:id/like", auth, likePost);

module.exports = router;
