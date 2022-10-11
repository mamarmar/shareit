import mongoose from "mongoose";
import offeredItemModel from "../models/offeredItemModel.js";

//Get all offered items
export const getOfferedItems = async(req, res) => {
    try {
        const offeredItems = await offeredItemModel.find();
        res.status(201).json({data: offeredItems});
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
};

//Get only those offered items that satisfy the search queries
export const getOfferedItemsByName = async(req, res) => {
    try {
        const { name } = req.query;
        const offeredItems = await offeredItemModel.find({name: name});
        res.status(201).json({data: offeredItems});
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}

//Get only those offered items that satisfy the search queries
export const getOfferedItemsByCity = async(req, res) => {
    try {
        const { city } = req.query;
        const offeredItems = await offeredItemModel.find({city: city});
        res.status(201).json({data: offeredItems});
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}

//Get only those offered items that satisfy the search queries
export const getOfferedItemsByCategory = async(req, res) => {
    try {
        const { category } = req.query;
        const offeredItems = await offeredItemModel.find({category: category});
        res.status(201).json({data: offeredItems});
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}

//Get specific offered item by id
export const getOfferedItem = async(req, res) => {
    const { id } = req.params;
    try {
        const offeredItem = await offeredItemModel.find({_id: id})
        res.status(201).json({data: offeredItem});
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
}

//Create new offered item
export const createOfferedItem = async(req, res) => {
    const newOfferedItem = new offeredItemModel(req.body);
    try {
        await newOfferedItem.save();
        res.status(201).send("Offered item created successfully");
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
};

//Delete offered item
export const deleteOfferedItem = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return (
            res.status(404).json({message: `No offered item with id: ${id}`})
        )
    };
    await offeredItemModel.findByIdAndRemove({_id: id});
    res.status(201).json({message: "Offered item deleted successfully."});
}