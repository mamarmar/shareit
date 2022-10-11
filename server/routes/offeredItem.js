import express from "express";
import { getOfferedItems, getOfferedItemsByName, getOfferedItemsByCity, getOfferedItemsByCategory, getOfferedItem, createOfferedItem, deleteOfferedItem } from "../controllers/offeredItem.js";

const router = express.Router();

//Get all Offered Items when user is not logged in
router.get("/notloggedin", getOfferedItems);
//Get all Offered Items when user is  logged in
router.get("/", getOfferedItems);
router.get("/search/name", getOfferedItemsByName);
router.get("/search/city", getOfferedItemsByCity);
router.get("/search/category", getOfferedItemsByCategory);
router.get("/:id", getOfferedItem);

router.post("/form", createOfferedItem);

router.delete("/:id", deleteOfferedItem);

export default router;
