import { Router } from "express";
import { getAllUsers } from "../repositories/userRepository";
import {getUser, delUser, addUser, updateUser } from "../controller/userController";

const router = Router();

// just temp while testing this, Goes directly to UserRepsitory for 
router.get("/", (req, res) => {
    res.json(getAllUsers());
});

router.get("/:userID", getUser);
router.delete("/:userID", delUser);
router.post("/", addUser);
router.patch("/:userID", updateUser);

export default router;