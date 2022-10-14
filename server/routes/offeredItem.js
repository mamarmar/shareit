import express from "express";
import { getOfferedItems, getOfferedItemsBySearch, getOfferedItem, createOfferedItem, deleteOfferedItem, reserveOfferedItem } from "../controllers/offeredItem.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

//Get all Offered Items when user is not logged in
router.get("/visitor", getOfferedItems);
//Get all Offered Items when user is  logged in
router.get("/", auth, getOfferedItems);
router.get("/search", getOfferedItemsBySearch);
router.get("/:id", auth, getOfferedItem);

router.post("/form", auth, createOfferedItem);

router.delete("/:id", auth, deleteOfferedItem);

router.patch("/:id", auth, reserveOfferedItem);

export default router;
