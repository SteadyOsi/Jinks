import { Router } from "express";
import { users } from "../data/userStore";
import {getUser, delUser, addUser, updateUser } from "../controller/userController";

const router = Router();

// just temp while testing this
router.get("/", (req, res) => {
    res.json(users);
});

router.get("/:username", getUser);
router.delete("/:username", delUser);
router.post("/", addUser);
router.patch("/:username", updateUser);

export default router;