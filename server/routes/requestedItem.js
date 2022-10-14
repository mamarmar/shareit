import express from "express";
import { getRequestedItems, getRequestedItemsBySearch, getRequestedItem, createRequestedItem, deleteRequestedItem, offerRequestedItem } from "../controllers/requestedItem.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();


router.get("/", auth, getRequestedItems);
router.get("/search", auth, getRequestedItemsBySearch);
router.get("/:id", auth, getRequestedItem);

router.post("/form", auth, createRequestedItem);

router.delete("/:id", auth, deleteRequestedItem);

router.patch("/:id", auth, offerRequestedItem)

export default router;
