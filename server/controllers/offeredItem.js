import offeredItemModel from "../models/offeredItemModel";

//Get all offered items
export const getOfferedItems = async(req, res) => {
    try {
        const offeredItems = await offeredItemModel.find({});
        res.status(201).json({data: offeredItems});
    }
    catch(err) {
        res.status(404).json({message: err.message});
    }
};

export const getOfferedItemsBySearch = async(req, res) => {

}