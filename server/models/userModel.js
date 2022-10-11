import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate: [validator.isEmail, 'Valid email is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        country: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        }, 
        profilePic : {
            type: String
        },
        itemsBorrowed: {
            type: Array
        },
        itemsLent: {
            type: Array
        }
        //averageRating to be added (should have)
    }
);

export default mongoose.model("User", userSchema);