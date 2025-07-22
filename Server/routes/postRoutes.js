const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Post = require("../models/Post");
const { uploadPost } = require("../multerConfig.js");

router.post("/create", authMiddleware, uploadPost.single("image"), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: "Content is required." });
    }

    const userId = req.user.userId;
    const image = req.file ? req.file.path : null;

    const newPost = new Post({ user: userId, content, image });
    await newPost.save();

    res.json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
