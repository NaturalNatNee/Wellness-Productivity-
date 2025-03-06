const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "An existing User already has these credentials." });
    }

    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    const payload = {
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const payload = {
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "12h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});


router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error"});
    }
});

router.put('/user', auth, async (req, res) => {
    const { username, email, preferences } = req.body;

    const userFields = {};
    if (username) userFields.username = username;
    if (email) userFields.email = email;
    if (preferences) userFields.preferences = preferences;

    try {
        let user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: userFields},
            { new: true }
        ).select(-password);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error"});
    }
});

router.delete('/user', auth, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user.id);
        res.json({ message: "User account deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
});

router.put('/password', auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try{
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password'});
        }

        //hash new password
        const salt = await bcrypt.genSalt(13);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.json({ message: 'Password updated successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error'});
    }
});




export default router;

//module.exports = router;
