import mongoose from "mongoose";

const offeredItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Item name is required']
        },
        category: {
            type: String,
            required: [true, 'Item category is required']
        },
        description: {
            type: String,
            required: [true, 'Item description is required']
        },
        condition: {
            type: String,
            required: [true, 'Item condition is required']
        },
        city: {
            type: String,
            required: [true, 'City where item is offered is required']
        },
        itemImages: [String],
        offeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        borrowedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], //Array of users because multiple users might borrow the offered item,
        reservedFromDate: {
            type: Date
        },
        reservedToDate: {
            type: Date
        }
    }
);

export default mongoose.model("OfferedItem", offeredItemSchema);