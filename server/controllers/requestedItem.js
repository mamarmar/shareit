import mongoose from "mongoose";
import requestedItemModel from "../models/requestedItemModel.js";
import userModel from "../models/userModel.js";

//Get all requested items
export const getRequestedItems = async (req, res) => {
  try {
    const requestedItems = await requestedItemModel.find().populate('borrowedBy').populate('offeredBy');
    res.status(201).json({ data: requestedItems });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Get only those requested items that satisfy the search queries
export const getRequestedItemsBySearch = async (req, res) => {
  try {
    const filtersArr = [];
    for (const filterKey of ["name", "city", "category"]) {
      if (req.query[filterKey]) {
        const thisFilter = {};
        thisFilter[filterKey] = req.query[filterKey];
        filtersArr.push(thisFilter);
      }
    }
    const filteredRequestedItems = await requestedItemModel.find(req.query).populate('borrowedBy').populate('offeredBy');
    res.status(201).json({ data: filteredRequestedItems });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Get specific requested item by id
export const getRequestedItem = async (req, res) => {
  const { id } = req.params;
  try {
    const requestedItem = await requestedItemModel.find({ _id: id }).populate('borrowedBy').populate('offeredBy');
    res.status(201).json({ data: requestedItem });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Create new requested item
export const createRequestedItem = async (req, res) => {
  const newRequestedItem = new requestedItemModel(req.body);
  newRequestedItem.borrowedBy = req.user.user_id;   //the item is requested by the user who created the listing (current user)
  try {
    await newRequestedItem.save();
    //Find current user and update itemsBorrowed array
    const user = await userModel.findById(req.user.user_id);
    user.itemsBorrowed.push(newRequestedItem);
    await user.save();
    res.status(201).send("requested item created successfully");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Delete requested item
export const deleteRequestedItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ message: `No requested item with id: ${id}` });
  }
  const requestedItem = await requestedItemModel.findById(id);
  if (req.user.user_id === requestedItem.borrowedBy.valueOf()) {        // users can only delete items they have created themselves
    await requestedItemModel.findByIdAndRemove(id);
    res.status(201).json({ message: "requested item deleted successfully." });
  } else {
      res.status(403).send("You are not authorized to delete this item");
  };
};

//Offer requested item
export const offerRequestedItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No requested item with id: ${id}` });
  }
  try {
    const requestedItem = await requestedItemModel.findById(id);
    requestedItem.offeredBy = req.user.user_id; //current user
    await requestedItem.save();
    res.status(201).send(`Item offered successfully: ${requestedItem}`);
  }catch(err) {
    res.status(400).json({ message: err.message });
  }
}
