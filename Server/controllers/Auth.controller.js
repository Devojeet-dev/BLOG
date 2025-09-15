import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
import bcryptjs, { hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";

// Register API
export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(handleError(409, "User already registered"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User has successfully registered.",
    });
  } catch (error) {
    next(handleError(500, error.message));
  }
};

// login API
export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user by email
    const User = await User.findOne({ email });
    if (!User) {
      return next(handleError(404, "Invalid login credentials"));
    }

    // 2️⃣ Compare password
    const isMatch = await bcryptjs.compare(password, User.password);
    if (!isMatch) {
      return next(handleError(404, "Invalid login credentials"));
    }

    // 3️⃣ Create JWT token
    const token = jwt.sign(
      {
        _id: User._id,
        name: User.name,
        email: User.email,
        avatar: User.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Send cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // 5️⃣ Send success response
    res.status(200).json({
      success: true,
      user: {
        _id: User._id,
        name: User.name,
        email: User.email,
        avatar: User.avatar,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
};

//Google login API
export const GoogleLogin = async (req, res, next) => {
  try {
    const { name, email, avatar } = req.body;

    // 1️⃣ Find user by email
    let user = await User.findOne({ email });

    // 2️⃣ If user doesn’t exist, create new one
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8); // safer random string
      const hashedPassword = await bcryptjs.hash(randomPassword, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        avatar,
      });

      user = await newUser.save();
    }

    // 3️⃣ Create JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Send cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    // 5️⃣ Send success response
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    next(handleError(500, error.message));
  }
};
