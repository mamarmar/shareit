import mongoose from "mongoose";

const offeredItemSchema = new mongoose.Schema(
    {
        itemName: {
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
        borrowedBy: [ //array because multiple users might borrow the same item on different dates
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                reservedFromDate: {type: Date, required: [true, 'Date is required']},
                reservedToDate: {type: Date, required: [true, 'Date is required']}
            }
        ],
        // isAvailable: [
        //     {
        //         state: {type:Boolean, default: false},
        //         fromDate: Date,
        //         toDate: Date
        //     }
        // ]
    }
);

export default mongoose.model("OfferedItem", offeredItemSchema);