import express from "express";
import { Createtoken } from "../jwt.js";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ email, name, password });
  await newUser.save();

  const token = await Createtoken(newUser);

  res.cookie("token", token, {
  domain: ".dubaifitmovement.xyz",
  httpOnly: true,
  sameSite: "None",
  secure: true
});
  

  res.json({ message: "User created successfully", token});
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = await Createtoken(user);

  res.cookie("token", token, {
  domain: ".dubaifitmovement.xyz",
  httpOnly: true,
  sameSite: "None",
  secure: true
});

  res.json({ message: "User created successfully", token});
});

export default router;
