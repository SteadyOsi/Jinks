import { Router } from "express";
import { getAllMessages } from "../repositories/messageRepository";
import {getMesID, delID, addMes, updateMes, getConvoUoneToUtwo} from "../controller/messageController"

const router = Router();

router.get("/", (req, res) => {
    res.json(getAllMessages()); // used for testing
});

// CRUD operations for messages
router.get("/conversations/:userid1/:userid2", getConvoUoneToUtwo);
router.get("/:id", getMesID);
router.delete("/:id", delID);
router.post("/", addMes);
router.patch("/:id", updateMes);

export default router;