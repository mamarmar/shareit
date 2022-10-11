import express from "express";

const router = express.Router();

//Get all Offered Items when user is not logged in
router.get("/notloggedin", getOfferedItems);
//Get all Offered Items when user is  logged in
router.get("/", getOfferedItems);
router.get("/search", getOfferedItemsBySearch);
router.get("/:id", getOfferedItem);

router.post("/", createOfferedItem);

export default router;
