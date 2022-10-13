import express from "express";
import { signup, login, getUsers} from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/all", getUsers);

export default router;
