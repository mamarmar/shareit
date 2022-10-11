import mongoose from "mongoose";

const requestedItemSchema = new mongoose.Schema(
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
        fromDate: {
            type: Date,
            required: [true, 'Date is required']
        },
        toDate: {
            type: Date,
            required: [true, 'Date is required']
        },
        indicativeImage: {
            type: String //ability to upload multiple images should be added
        },
        offeredBy: {
            type: String
        },
        borrowedBy: {
            type: String
        }   
    }
);

export default mongoose.model("RequestedItem", requestedItemSchema);