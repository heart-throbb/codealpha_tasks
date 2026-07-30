const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { caption, image } = req.body;

    if (!caption) {
      return res.status(400).json({
        success: false,
        message: "Caption is required",
      });
    }

    const post = await Post.create({
      user: req.user.id,
      caption,
      image: image || "",
    });

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "username profilePicture",
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePicture")
      .populate("likes", "username")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "username profilePicture")
      .populate("likes", "username");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { caption, image } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (caption !== undefined) post.caption = caption;

    if (image !== undefined) post.image = image;

    await post.save();

    const updated = await Post.findById(post._id).populate(
      "user",
      "username profilePicture",
    );

    res.json({
      success: true,
      message: "Post updated",
      post: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await post.deleteOne();

    res.json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const liked = post.likes.includes(req.user.id);

    if (liked) {
      post.likes.pull(req.user.id);

      await post.save();

      return res.json({
        success: true,
        message: "Post unliked",
        likes: post.likes.length,
      });
    }

    post.likes.push(req.user.id);

    await post.save();

    res.json({
      success: true,
      message: "Post liked",
      likes: post.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate("user", "username profilePicture")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      posts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
