import mongoose from "mongoose";
import offeredItemModel from "../models/offeredItemModel.js";

//Get all offered items
export const getOfferedItems = async (req, res) => {
  try {
    const offeredItems = await offeredItemModel.find().populate('offeredBy').populate({path:'borrowedBy', populate:'user'});
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
    const filteredOfferedItems = await offeredItemModel.find(req.query).populate('offeredBy').populate({path:'borrowedBy', populate:'user'});
    res.status(201).json({ data: filteredOfferedItems });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Get specific offered item by id
export const getOfferedItem = async (req, res) => {
  const { id } = req.params;
  try {
    const offeredItem = await offeredItemModel.find({ _id: id }).populate('offeredBy').populate({path:'borrowedBy', populate:'user'});
    res.status(201).json({ data: offeredItem });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//Create new offered item
export const createOfferedItem = async (req, res) => {
  const newOfferedItem = new offeredItemModel(req.body);
  newOfferedItem.offeredBy = req.user.user_id;   //the item is offered by the user who created the listing (current user)
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
  if (req.user.user_id === offeredItem.offeredBy.valueOf()) {        // users can only delete items they have created themselves
    await offeredItemModel.findByIdAndRemove(id);
    res.status(201).json({ message: "Offered item deleted successfully." });
  } else {
      res.status(403).send("You are not authorized to delete this item");
  };
};

//Reserve offered item
export const reserveOfferedItem = async(req, res) => {
  const { id } = req.params;
  const { reservedFromDate, reservedToDate } = req.body; //the dates that the user wants to reserve the item for
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: `No offered item with id: ${id}` });
  }
  try {
    const offeredItem = await offeredItemModel.findById(id);
    //Create object that will contain details of borrowing (user, reservedFormDate, reservedToDate)
    const borrowing ={};
    borrowing.user = req.user.user_id; //current user
    borrowing.reservedFromDate = new Date(reservedFromDate);
    borrowing.reservedToDate = new Date(reservedToDate);
    //Check if dates are already taken by other user
    for (const borrowingObj of offeredItem.borrowedBy) {
      if ( (borrowing.reservedFromDate.toDateString() ===  borrowingObj.reservedFromDate.toDateString() || borrowing.reservedToDate.toDateString() === borrowingObj.reservedFromDate.toDateString()) //dates are exactly the same
      || (borrowing.reservedFromDate <  borrowingObj.reservedFromDate && borrowing.reservedToDate >= borrowingObj.reservedFromDate)  // fromDate is earlier but toDate falls within or after dates that item is reserved by other user
      || (borrowing.reservedFromDate <= borrowingObj.reservedToDate && borrowing.reservedToDate > borrowingObj.reservedToDate)) {     //toDate is later but fromDate falls within or before dates that item is reserved by other user
          return res.status(409).send("These dates are not available. Please select different dates");
        } 
    }
    //If dates are not taken, push the object to the offeredItem.borrowedBy array
    offeredItem.borrowedBy.push(borrowing);
    await offeredItem.save();
    res.status(201).send(`Item reserved successfully: ${offeredItem}`);
  }catch(err) {
    res.status(400).json({ message: err.message });
  }
}
