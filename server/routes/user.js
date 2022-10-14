import express from "express";
import { signup, login, logout, getUsers, getUser, deleteUser, welcome} from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);

router.get("/all", auth, getUsers);
router.get("/:id", auth, getUser);
router.get("/welcome", auth, welcome);

router.delete("/:id", auth, deleteUser);

export default router;
