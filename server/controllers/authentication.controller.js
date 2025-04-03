// all imports
import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import auth from "../middleware/auth-middleware.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

//Register
//Create User
// below is the format for raw JSON format used for testing in Postman
// {
//   "firstName": "John",
//   "lastName": "Doe",
//   "email": "john.doe@example.com",
//   "password": "SecurePassword123"
// }
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "An existing User already has these credentials." });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    //payload as an object helps simplify code
    const payload = {
      user: {
        id: newUser._id.toString(),
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    };

    //generate token
    jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//below is a users data so i can remember
// {
//   "firstName": "Trent",
//   "lastName": "Under",
//   "email": "UT@example.com",
//   "password": "INSECUREPASSWORD"
// }

//Login
//grant token
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

    // payload as an object simplifies jwt
    const payload = {
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };

    //generate token
    jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Read user data
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//change user info
// not currently employed in frontend
router.put("/user", auth, async (req, res) => {
  //further fields can be added later if we decide to add
  const { firstName, lastName, email } = req.body;

  const userFields = {};
  if (firstName) userFields.firstName = firstName;
  if (lastName) userFields.lastName = lastName;
  if (email) userFields.email = email;

  // Explicitly reject password changes through this route
  if (req.body.password) {
    return res.status(400).json({
      error:
        "Password updates are not allowed through this endpoint. Please use the dedicated password update route.",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//delete user
router.delete("/user", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User account deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//change password
router.put("/change-password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    //hash new password
    const salt = await bcrypt.genSalt(13);
    user.password = await bcrypt.hash(newPassword, salt);

    //save password to user
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//export to be imported in app.js

export default router;
