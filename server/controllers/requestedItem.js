import mongoose from "mongoose";
import requestedItemModel from "../models/requestedItemModel.js";

//Get all requested items
export const getRequestedItems = async(req, res) => {
    try {
        const requestedItems = await requestedItemModel.find();
        res.status(201).json({data: requestedItems});
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
};

//Get only those requested items that satisfy the search queries
export const getRequestedItemsBySearch = async(req, res) => {
    try {
        const filtersArr = []
        for (const filterKey of ['name', 'city', 'category']) {
            if (req.query.filterKey) {
                const thisFilter = {};
                thisFilter[filterKey] = req.query.filterKey;
                filtersArr.push(thisFilter);
                console.log(filtersArr);
            };
        };
        const filteredRequestedItems = await requestedItemModel.find(req.query);
        res.status(201).json({data: filteredRequestedItems});
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}

//Get specific requested item by id
export const getRequestedItem = async(req, res) => {
    const { id } = req.params;
    try {
        const requestedItem = await requestedItemModel.find({_id: id})
        res.status(201).json({data: requestedItem});
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}

//Create new requested item
export const createRequestedItem = async(req, res) => {
    const newRequestedItem = new requestedItemModel(req.body);
    try {
        await newRequestedItem.save();
        res.status(201).send("requested item created successfully");
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
};

//Delete requested item
export const deleteRequestedItem = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            res.status(404).json({message: `No requested item with id: ${id}`})
        )
    };
    await requestedItemModel.findByIdAndRemove({_id: id});
    res.status(201).json({message: "requested item deleted successfully."});
}