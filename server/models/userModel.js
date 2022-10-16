import mongoose from "mongoose";
import validator from "validator";

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
            validate: [ validator.isEmail,{ message: "Valid email is required"}]
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
         //itemsBorrowed array can be populated either by OfferedItem or by RequestedItem.
         //If the requested item is requested by the user, then the RequestedItem should be added to the array.
         //If the offered item is borrowed by the user, then the OfferedItem should be added to the array.
        itemsBorrowed: [{ 
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'itemsBorrowedModel'
        }], 
        itemsBorrowedModel: {         
            type: String,
            enum: ['OfferedItem', 'RequestedItem']
        },
        //itemsLent array can also be populated either by OfferedItem or by RequestedItem.
        //If the offered item is offered by the user, then the OfferedItem should be added to the array. 
        //If the requested item is lent by the user, then the RequestedItem should be added to the array.
        itemsLent: [{ 
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'itemsLentModel' 
        }], 
        itemsLentModel: {              
            type: String,
            enum: ['OfferedItem', 'RequestedItem']
        },
        token: {
            type: String
        }
        //averageRating to be added (should have)
    }
);

export default mongoose.model("User", userSchema);