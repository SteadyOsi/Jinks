import { Request, Response } from "express";
import { Conversation, ConvoInit } from "../types/Conversations";
import { ConvoMember } from "../types/ConvoMember";
import { createMemberRepo } from "../repositories/convoMembersRepository";
import {
  createConvoRepo,
  getAllConvoRepo,
  getConvoByIDRepo,
  delConvoByIDRepo,
  getConvoIDByTitleRepo,
} from "../repositories/conversationRepository";

// get all of the Convos
export function getAllConvo(req: Request, res: Response) {
  return res.json(getAllConvoRepo());
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
    console.log(getConvoIDByTitleRepo(newConvo.title));
    console.log("debug");

    newConvo.members.forEach((userID) => {
      const newMember: ConvoMember = {
        conversationID: getConvoIDByTitleRepo(newConvo.title),
        userID: userID,
      };

      const result = createMemberRepo(newMember);
    });

    if (createdConvoRes) {
      return res.json({ success: true, conversation: newConvo });
    } else {
      res.status(400).send("A internal error occured");
    }
  }
}

// get a convo by ID
export function getConvoByID(req: Request, res: Response) {
  const convoID = parseInt(req.params.ID as string);
  const convoRes = getConvoByIDRepo(convoID);

  if (convoRes) {
    return res.json(convoRes);
  } else {
    return res.status(404).json({ error: "data not found" });
  }
}

// delete a convo by ID
export function delConvoByID(req: Request, res: Response) {
  const convoID = parseInt(req.params.ID as string);
  const delConvoRes = delConvoByIDRepo(convoID);

  if (delConvoRes.changes === 0) {
    return res.status(404).json({ error: "data not found" });
  } else {
    return res.status(204).send();
  }
}
