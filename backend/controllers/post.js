import InstaPost from "../models/instaPost.model.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await InstaPost.find({ user: req.params.userId }).populate(
      "user"
    );
    if (posts.length > 0) {
      res.json(posts);
    } else {
      res.status(404).json({ error: "Posts not found" });
    }
  } catch (error) {
    res.status(505).json({ error: `Failed to get Posts ${error}` });
  }
};

export const addPost = async (req, res) => {
  try {
    const newPost = new InstaPost(req.body);
    const post = await newPost.save();
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(505).json({ error: `Failed to get Post ${error}` });
  }
};
export const addMultiPost = async (req, res) => {
  try {
    const post = await InstaPost.insertMany(req.body);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(505).json({ error: `Failed to get Post ${error}` });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await InstaPost.findByIdAndUpdate(
      req.params.postId,
      req.body,
      { new: true }
    );
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(505).json({ error: `Failed to get Post ${error}` });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await InstaPost.findByIdAndDelete(req.params.postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(505).json({ error: `Failed to get Post ${error}` });
  }
};
