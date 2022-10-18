import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

dotenv.config();

//Signup
export const signup = async (req, res) => {
  try {
    //Get user input
    const {
      firstName,
      lastName,
      email,
      password,
      country,
      city,
      address,
      profilePic,
    } = req.body;
    //Validate user input
    if (
      !(
        firstName &&
        lastName &&
        email &&
        password &&
        country &&
        city &&
        address
      )
    ) {
      res.status(400).send("Fields with an asterisk are required");
    }
    //Check if user already exists
    //Validate if user exists in database
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User already exists. Please log in.");
    }
    //Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);
    //Create user in database
    const user = await userModel.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      country,
      city,
      address,
      profilePic,
    });
    //Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );
    //Save user token
    user.token = token;
    //Return new user
    res.status(201).json(user);
  } catch (err) {
    res.status(401).send(err);
  }
};

//Login
export const login = async (req, res) => {
  try {
    //Get user input
    const { email, password } = req.body;
    //Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    //Validate if user exists in database
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      //Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      //Save user token
      user.token = token;
      //Return user
      res.status(200).send({user});
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    res.status(401).send(err);
  }
};

//Logout
export const logout = async (req, res) => {
  if (req.headers && req.headers["x-access-token"]) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).res.json({success: false, message: "Authorization failed"})
    }
    //Remove token from current user
    await userModel.findByIdAndUpdate(req.user.user_id, {token:""});
    res.status(201).json({success: true, message: "Log out successful"})
  }
  //Need to figure out how to destroy token
};

//Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(201).json({ data: users });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Get specific user by id
export const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  try {
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No user with id: ${id}` });
    }
    if (req.user.user_id === id) {                          // users can only delete themselves
        await userModel.findByIdAndRemove(id);
        res.status(201).json({ message: "User deleted successfully." });
    } else {
        res.status(403).send("You are not authorized to delete this user");
    };
  };

//Welcome user
export const welcome = async (req, res) => {
  res.status(200).send("Welcome");
};
