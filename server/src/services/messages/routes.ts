import { Router } from "express";
import { getAllMessages } from "./repository";
import {getMesID, delID, addMes, updateMes, getConvoUoneToUtwo} from "./controller"

const router = Router();

router.get("/", (req, res) => {
    res.json(getAllMessages()); // used for testing
});

// Message lookup and mutation endpoints; the conversation route returns messages in a chat.
router.get("/conversations/:userid1/:userid2", getConvoUoneToUtwo);
router.get("/:id", getMesID);
router.delete("/:id", delID);
router.post("/", addMes);
router.patch("/:id", updateMes);

export default router;
