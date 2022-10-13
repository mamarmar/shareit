import express from "express";
import { getOfferedItems, getOfferedItemsBySearch, getOfferedItem, createOfferedItem, deleteOfferedItem } from "../controllers/offeredItem.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

//Get all Offered Items when user is not logged in
router.get("/notloggedin", getOfferedItems);
//Get all Offered Items when user is  logged in
router.get("/", auth, getOfferedItems);
router.get("/search", getOfferedItemsBySearch);
router.get("/:id", auth, getOfferedItem);

router.post("/form", auth, createOfferedItem);

router.delete("/:id", auth, deleteOfferedItem);

export default router;
