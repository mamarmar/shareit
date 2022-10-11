import express from "express";
import { getRequestedItems, getRequestedItemsByName, getRequestedItemsByCity, getRequestedItemsByCategory, getRequestedItem, createRequestedItem, deleteRequestedItem } from "../controllers/requestedItem.js";

const router = express.Router();


router.get("/", getRequestedItems);
router.get("/search/name", getRequestedItemsByName);
router.get("/search/city", getRequestedItemsByCity);
router.get("/search/category", getRequestedItemsByCategory);
router.get("/:id", getRequestedItem);

router.post("/form", createRequestedItem);

router.delete("/:id", deleteRequestedItem);

export default router;
