import { Request, Response } from "express";
import { ConvoInit, ConversationDetails } from "../types/Conversations";
import { ConvoMember } from "../types/ConvoMember";
import { createMemberRepo } from "../repositories/convoMembersRepository";
import {
    createConvoRepo,
    getAllConvoRepo,
    getConvoByIDRepo,
    delConvoByIDRepo,
    getMessagesForConvoRepo,
    getAllConvoPreviewsRepo,
} from "../repositories/conversationRepository";

// get all of the Convos
export function getAllConvo(req: Request, res: Response) {
    return res.json(getAllConvoRepo());
}

// get all convo preivews
export function getAllConvoPreviews(req: Request, res: Response) {
    return res.json(getAllConvoPreviewsRepo());
}

// create a convo
export function createConvo(req: Request, res: Response) {
    // checking that the http inputs are valid
    if (
        typeof req.body.title === "string" &&
        req.body.title.trim() !== "" &&
        Array.isArray(req.body.memberIDs) &&
        req.body.memberIDs.every((id: number) => typeof id === "number")
    ) {
        const newConvo: ConvoInit = {
            title: req.body.title,
            createdAT: new Date().toISOString(),
            members: req.body.memberIDs,
        };

        const createdConvoRes = createConvoRepo(newConvo);

        newConvo.members.forEach((userID) => {
            const newMember: ConvoMember = {
                conversationID: createdConvoRes.lastInsertRowid as number,
                userID: userID,
            };

            const result = createMemberRepo(newMember);
        });

        if (createdConvoRes) {
            return res.json({
                success: true,
                conversation: newConvo,
            });
        } else {
            res.status(400).send("A internal error occured");
        }
    }
}

// get a convo by ID
// and the messages of that convo
export function getConvoByID(req: Request, res: Response) {
    const convoID = parseInt(req.params.ID as string);
    const convoMetaRes = getConvoByIDRepo(convoID);

    if (!convoMetaRes) {
        return res.status(404).json({ error: "Conversation not found" });
    }

    const convoMesRes = getMessagesForConvoRepo(convoID);

    const chatWithMes: ConversationDetails = {
        id: convoMetaRes.id,
        title: convoMetaRes.title,
        createdAT: convoMetaRes.createdAT,
        messages: convoMesRes,
    };

    if (chatWithMes) {
        return res.json(chatWithMes);
    } else {
        return res.status(404).json({ error: "data not found" });
    }
}

// delete a convo by ID
// should this delete the messages of the conversation?  this is something to keep in mind
export function delConvoByID(req: Request, res: Response) {
    const convoID = parseInt(req.params.ID as string);
    const delConvoRes = delConvoByIDRepo(convoID);

    if (delConvoRes.changes === 0) {
        return res.status(404).json({ error: "data not found" });
    } else {
        return res.status(204).send();
    }
}
