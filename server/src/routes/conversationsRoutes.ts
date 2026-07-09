import { Router } from "express";
import {
        getAllConvo,
        createConvo,
        getConvoByID,
        delConvoByID,
} from "../controller/conversationController";

const router = Router();

router.get("/", getAllConvo); // gets all the conversations
router.get("/:ID", getConvoByID);
router.delete("/:ID", delConvoByID);
router.post("/", createConvo);
// router.patch("/:ID");

export default router;
