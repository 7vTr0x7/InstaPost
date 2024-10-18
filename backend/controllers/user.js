import InstaUser from "../models/instaUser.model.js";

export const getUser = async (req, res) => {
  try {
    const user = await InstaUser.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(505).json({ error: `Failed to get User ${error}` });
  }
};

export const addUser = async (req, res) => {
  try {
    const newUser = new InstaUser(req.body);
    const User = await newUser.save();
    if (User) {
      res.json(User);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(505).json({ error: `Failed to get User ${error}` });
  }
};
