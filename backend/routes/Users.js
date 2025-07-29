import express from "express";
import { Createtoken, verifyToken, verifyAdmin } from "../jwt.js";
import User from "../models/User.js";

const router = express.Router();

// SIGNUP
router.get("/allUsers", verifyAdmin, async (req, res)=>{
  const users = await User.find()
  res.json(users)
})
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

router.get("/data", verifyToken, async (req, res) => {
  const id = req.user.id
  const user = await User.findOne({_id: id})
  res.json({user})

})

router.post("/admin/login", async (req, res) =>{
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

  if (user.role !== "admin") {
    return res.status(400).json({ message: "You are not an admin idiot 😡😡😡"})
  }

  const token = await Createtoken(user);

  res.status(200).json({message: "logged in", token: token})
})
export default router;
