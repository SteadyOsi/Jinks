import { Router } from "express";
import { getAllConvo } from "../controller/conversationController";

const router = Router();

router.get("/", getAllConvo); // gets all the conversations
router.get("/:ID",);
router.delete("/:ID",);
router.post("",);
router.patch("/:ID",);

export default router;