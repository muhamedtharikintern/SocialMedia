import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { name, password } = req.body || {};
    if (!name || !password) {
      return res
        .status(400)
        .json({ message: "name and password are required" });
    }
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );
    return res.status(200).json({ token, user: { id: user.id, name, verificationStep: user.verificationStep } });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { name,email, password } = req.body || {};
    if (!name ||!email || !password) {
      return res
        .status(400)
        .json({ message: "name, email and password are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    const token = jwt.sign(
      { sub: user.id,name: user.name, email: user.email },
      process.env.JWT_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );
    return res
      .status(201)
      .json({ message: "registered", token, user: { id: user.id,name, email, verificationStep: user.verificationStep } });
  } catch (err) {
    next(err);
  }
});

export default router;


