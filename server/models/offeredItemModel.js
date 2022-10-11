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
        itemImage: {
            type: String //ability to upload multiple images should be added
        },
        offeredBy: {
            type: String
        },
        borrowedBy: {
            type: String
        },
        reservedFromDate: {
            type: Date
        },
        reservedToDate: {
            type: Date
        }
    }
);

export default mongoose.model("OfferedItem", offeredItemSchema);