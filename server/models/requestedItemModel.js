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
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        fromDate: {
            type: Date,
            required: [true, 'Date is required']
        },
        toDate: {
            type: Date,
            required: [true, 'Date is required']
        },
        indicativeImage: [String],
        offeredBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        borrowedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

export default mongoose.model("RequestedItem", requestedItemSchema);