import express from "express";
import { getRequestedItems, getRequestedItemsBySearch, getRequestedItem, createRequestedItem, deleteRequestedItem } from "../controllers/requestedItem.js";

const router = express.Router();


router.get("/", getRequestedItems);
router.get("/search", getRequestedItemsBySearch);
router.get("/:id", getRequestedItem);

router.post("/form", createRequestedItem);

router.delete("/:id", deleteRequestedItem);

export default router;
