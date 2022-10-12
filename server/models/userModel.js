import mongoose from "mongoose";
import { isEmail } from "validator";

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
            lowercase: true,
            unique: true,
            validate: { validator: isEmail, message: "Valid email is required"}
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
        itemsBorrowed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RequestedItem',  ref: 'OfferedItem'}], //If the requested item is requested by the user, then the requested item should be added to the array. If the offered item is borrowed by the user, then the offered item should be added to the array. Can I use multiple refs? (https://mongoosejs.com/docs/populate.html#dynamic-ref)
        itemsLent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OfferedItem', ref: 'RequestedItem' }] //Just like above, but opposite. If the offered item is offered by the user, then the offered item should be added to the array. If the requested item is lent by the user, then the requested item should be added to the array.
        //averageRating to be added (should have)
    }
);

export default mongoose.model("User", userSchema);