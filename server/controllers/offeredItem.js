import mongoose from "mongoose";
import offeredItemModel from "../models/offeredItemModel.js";

//Get all offered items
export const getOfferedItems = async (req, res) => {
  try {
    const offeredItems = await offeredItemModel.find();
    res.status(201).json({ data: offeredItems });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Get only those offered items that satisfy the search queries
export const getOfferedItemsBySearch = async (req, res) => {
  try {
    const filtersArr = [];
    for (const filterKey of ["name", "city", "category"]) {
      if (req.query[filterKey]) {
        const thisFilter = {};
        thisFilter[filterKey] = req.query[filterKey];
        filtersArr.push(thisFilter);
      }
    }
    const filteredOfferedItems = await offeredItemModel.aggregate([
      {
        $match: {
          $and: filtersArr,
        },
      },
    ]);
    res.status(201).json({ data: filteredOfferedItems });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Get specific offered item by id
export const getOfferedItem = async (req, res) => {
  const { id } = req.params;
  try {
    const offeredItem = await offeredItemModel.find({ _id: id });
    res.status(201).json({ data: offeredItem });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Create new offered item
export const createOfferedItem = async (req, res) => {
  const newOfferedItem = new offeredItemModel(req.body);
  newOfferedItem.offeredBy = req.user.user_id;   //the item is offered by the user who created the listing
  try {
    await newOfferedItem.save();
    res.status(201).send( `Offered item created successfully: ${newOfferedItem}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Delete offered item
export const deleteOfferedItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No offered item with id: ${id}` });
  }
  const offeredItem = await offeredItemModel.findById(id);
  if (req.user.user_id === offeredItem.offeredBy) {        // users can only delete items they have created themselves
    await offeredItemModel.findByIdAndRemove(id);
    res.status(201).json({ message: "Offered item deleted successfully." });
} else {
    res.status(403).send("You are not authorized to delete this item");
};
  
 
};
