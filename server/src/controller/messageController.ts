import { Request, Response } from "express";
import { Message } from "../types/Message";
import {
        addMessage,
        getMesByMesId,
        delMesByMesId,
        updateMesByMesId,
        getConvoByIdS,
} from "../repositories/messageRepository";

export function getMesID(req: Request, res: Response) {
        // get message based on message ID
        // get id
        const id = parseInt(req.params.id as string);

        if (Number.isNaN(id)) {
                return res.status(400).json({ error: "Bad Request" });
        }

        //find matching message
        const mes = getMesByMesId(id);

        //If found
        if (mes) {
                return res.json(mes);
        } else {
                // otherwise
                return res.status(404).json({ error: "data not found" });
        }
}

// user one's ID and user two's ID
// conversation between them
export function getConvoUoneToUtwo(req: Request, res: Response) {
        //get User's ID's
        const userOne = parseInt(req.params.userid1 as string);
        const userTwo = parseInt(req.params.userid2 as string);

        // get conversations:
        const getConvoRes = getConvoByIdS(userOne, userTwo);

        if (getConvoRes) {
                return res.json(getConvoRes);
        } else {
                return res.status(404).json({ error: "bad request" });
        }
}

// delete a user message based on message ID
export function delID(req: Request, res: Response) {
        // get id
        const id = parseInt(req.params.id as string);

        if (Number.isNaN(id)) {
                return res.status(400).json({ error: "Bad Request" });
        }

        //find matching message index
        const mesDelRes = delMesByMesId(id);

        //If found
        if (mesDelRes) {
                // .changes === 0
                res.status(204).send();
        } else {
                // otherwise
                return res.status(404).json({ error: "data not found" });
        }
}

export function addMes(req: Request, res: Response) {
        if (
                typeof req.body.senderID === "number" &&
                typeof req.body.content === "string" &&
                typeof req.body.conversationID === "number" &&
                req.body.content.trim() !== ""
        ) {
                const newMessage: Message = {
                        id: -1,
                        senderID: req.body.senderID,
                        conversationID: req.body.conversationID,
                        content: req.body.content,
                        createdAT: new Date().toISOString(),
                };

                const addMesRes = addMessage(newMessage);

                if (addMesRes) {
                        return res.json({ success: true, message: newMessage });
                } // probably need to add a error code here if it goes wrong
        } else {
                res.status(400).send("Ya fucked up");
        }
}

export function updateMes(req: Request, res: Response) {
        // get id
        const id = parseInt(req.params.id as string);
        const bodyContent = req.body.content;

        if (Number.isNaN(id)) {
                return res
                        .status(400)
                        .json({ error: "ID must be a valid number" });
        }

        // validating body:
        if (typeof bodyContent !== "string" || bodyContent.trim() === "") {
                return res
                        .status(400)
                        .json({ error: "content must be a non-empty string" });
        }

        //find matching message index
        const mesUpdateRes = updateMesByMesId(id, bodyContent);

        //If found
        if (mesUpdateRes) {
                res.status(204).send();
        } else {
                // otherwise
                return res.status(404).json({ error: "data not found" });
        }
}
