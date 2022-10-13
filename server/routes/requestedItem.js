import express from "express";
import { getRequestedItems, getRequestedItemsBySearch, getRequestedItem, createRequestedItem, deleteRequestedItem } from "../controllers/requestedItem.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();


router.get("/", auth, getRequestedItems);
router.get("/search", auth, getRequestedItemsBySearch);
router.get("/:id", auth, getRequestedItem);

router.post("/form", auth, createRequestedItem);

router.delete("/:id", auth, deleteRequestedItem);

export default router;
