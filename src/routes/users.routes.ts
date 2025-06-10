import { Router } from "express";
import { deleteUser, getUsers } from "../controllers/users.controller";
import { isAuth } from "../middleware/auth";

const router = Router();

router.get("/", getUsers)

router.delete("/:id", isAuth, deleteUser)

export default router;