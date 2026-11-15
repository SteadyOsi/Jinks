import { Router } from "express";
import {
        getAllConvo,
        createConvo,
        getConvoByID,
        delConvoByID,
        getAllConvoPreviews
} from "../controller/conversationController";

const router = Router();

// Full list and lightweight sidebar previews are separate responses.
router.get("/", getAllConvo);
router.get("/preview/", getAllConvoPreviews)
router.get("/:ID", getConvoByID);
router.delete("/:ID", delConvoByID);
router.post("/", createConvo);
// router.patch("/:ID");

export default router;
