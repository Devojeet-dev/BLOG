import { handelError } from "../helpers/handelError.js";
import User from "../models/user.model.js";
import bcryptjs, { hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";


export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return next(handelError(409, "User already registered"));
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
    next(handelError(500, error.message));
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user by email
    const User = await User.findOne({ email });
    if (!User) {
      return next(handelError(404, "Invalid login credentials"));
    }

    // 2️⃣ Compare password
    const isMatch = await bcryptjs.compare(password, User.password);
    if (!isMatch) {
      return next(handelError(404, "Invalid login credentials"));
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
    next(handelError(500, error.message));
  }
};
