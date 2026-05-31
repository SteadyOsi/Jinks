import { Router } from "express";
import { messages } from "../data/messageStore";
import {getID, delID, addMes, updateMes} from "../controller/messageController"

const router = Router();

router.get("/", (req, res) => {
    res.json(messages);
});

router.get("/:id", getID);
router.delete("/:id", delID);
router.post("/", addMes);
router.patch("/:id", updateMes);

export default router;