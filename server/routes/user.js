import express from "express";
import { signup, login, getUsers, welcome} from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/all", getUsers);
router.get("/welcome", auth, welcome);

export default router;
