import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/auth.models.js";
import { Client, Guarantor } from "../models/user.models.js";

export const signup = async (request, response, next) => {
  try {
    const { username, email, password, isAdmin } = request.body;

    if (!username || !email || !password) {
      next(errorHandler(400, "All fields are required."));
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(
        errorHandler(
          400,
          existingUser.email === email
            ? "Email is already in use."
            : "Username is already taken."
        )
      );
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    const savedUser = await newUser.save();
    response.status(201).json({
      success: true,
      message: "Sign Up Successful",
      user: savedUser,
    });
  } catch (error) {
    next(errorHandler(500, "Something went wrong. Please try again."));
  }
};

export const signin = async (request, response, next) => {
  const { email, password } = request.body;

  if (!email || !password) {
    next(errorHandler(404, "All fields are required."));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    response
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User has signed in successfully.",
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};

export const signout = (request, response, next) => {
  try {
    response
      .clearCookie("access_token", {
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User has been signed out successfully.",
      });
  } catch (error) {
    next(errorHandler(500, "Error signing out."));
  }
};

// Get all users
export const getAllUsers = async (request, response, next) => {
  try {
    const isAdmin = request.user.isAdmin;

    if (!isAdmin) {
      return next(errorHandler(403, "You are not allowed to view all users"));
    }

    const users = await User.find();
    response.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(errorHandler(500, "Error retrieving users from the database", error));
  }
};

export const getUserById = async (request, response, next) => {
  const userId = request.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const { password, ...rest } = user._doc;
    response.status(200).json({ success: true, rest });
  } catch (error) {
    next(errorHandler(500, "Failed to fetch user", error));
  }
};

export const updateUser = async (request, response, next) => {
  try {
    const userId = request.params.id;
    const { username, email, password, isAdmin } = request.body;

    // Ensure request.user exists and has the isAdmin property
    if (!request.user) {
      return next(errorHandler(401, "Unauthorized access"));
    }

    const isUserAdmin = request.user.isAdmin;

    // Prevent regular users from modifying the `isAdmin` field
    if (!isUserAdmin && isAdmin !== undefined) {
      return next(
        errorHandler(403, "You are not allowed to change admin status")
      );
    }

    // Prepare an update object
    const updateFields = { username, email };

    // Hash password if it's being updated
    if (password) {
      updateFields.password = bcryptjs.hashSync(password, 10);
    }

    // Only admins can update isAdmin status
    if (isUserAdmin && isAdmin !== undefined) {
      updateFields.isAdmin = isAdmin;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, "User not found"));
    }

    response.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(errorHandler(500, "Failed to update user", error));
  }
};

export const deleteUser = async (request, response, next) => {
  try {
    const userId = request.params.id;

    // Ensure request.user exists
    if (!request.user) {
      return next(errorHandler(401, "Unauthorized access"));
    }

    // Allow admins or the user themselves to delete
    if (!request.user.isAdmin && request.user.id !== userId) {
      return next(errorHandler(403, "You are not allowed to delete this user"));
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Delete all associated clients and guarantors
    await Client.deleteMany({ userId });
    await Guarantor.deleteMany({ userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    response.status(200).json({
      success: true,
      message: "User and associated records deleted successfully",
    });
  } catch (error) {
    next(errorHandler(500, "Failed to delete user"));
  }
};
