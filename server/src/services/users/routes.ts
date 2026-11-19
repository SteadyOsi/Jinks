import { Router } from "express";
import { getAllUsers } from "./repository";
import {getUser, delUser, addUser, updateUser } from "./controller";

const router = Router();

// Temporary inspection endpoint that reads users directly from the repository.
router.get("/", (req, res) => {
    res.json(getAllUsers());
});

router.get("/:userID", getUser);
router.delete("/:userID", delUser);
router.post("/", addUser);
router.patch("/:userID", updateUser);

export default router;
