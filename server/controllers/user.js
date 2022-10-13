import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

dotenv.config();

//Signup
export const signup = async(req, res) => {
    try {
        //Get user input
        const { firstName, lastName, email, password, country, city, address, profilePic } = req.body;
        //Validate user input
        if (!(firstName && lastName && email && password && country && city && address)) {
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
            profilePic
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
    } catch(err) {
        res.status(401).send(err);
    }
};

//Login
export const login = async(req, res) => {
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
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }
    } catch(err) {
        res.status(401).send(err);
    }
};

//Get all users
export const getUsers = async(req, res) => {
    try {
        const users = await userModel.find();
        res.status(201).json({ data: users });
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
}