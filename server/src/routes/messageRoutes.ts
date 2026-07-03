import { Router } from "express";
import { getAllMessages } from "../repositories/messageRepository";
import {getID, delID, addMes, updateMes} from "../controller/messageController"

const router = Router();

router.get("/", (req, res) => {
    res.json(getAllMessages());
});

// CRUD operations for messages
router.get("/:id", getID);
router.delete("/:id", delID);
router.post("/", addMes);
router.patch("/:id", updateMes);

export default router;