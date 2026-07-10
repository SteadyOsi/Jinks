import { Conversation, ConvoInit } from "../types/Conversations";
import { Message } from "../types/Message";
import db from "../database/db";

export function getAllConvoRepo() {
    const stmt = db.prepare(`
        SELECT *
	    FROM conversations c;
    `);

    const results = stmt.all() as Conversation[];
    return results;
}

export function createConvoRepo(convo: ConvoInit) {
    const stmt = db.prepare(`
		INSERT INTO conversations (title, createdAT) VALUES (?,?);
    `);

    const result = stmt.run(convo.title, convo.createdAT);

    return result;
}

// get convo by ID
export function getConvoByIDRepo(convoID: number) {
    const stmt = db.prepare(`
        SELECT *
        FROM conversations c
        WHERE c.id = ?;
    `);

        const result = stmt.get(convoID) as Conversation;

        return result;
}

// delete convo by ID
export function delConvoByIDRepo(convoID: number) {
    const stmt = db.prepare(`
        DELETE 
        FROM conversations
        WHERE id = ?  
    `);

        const result = stmt.run(convoID); // if result.changes === 0 then no user with that ID existed.

        return result;
}

export function getConvoIDByTitleRepo(title: string) {
    const stmt = db.prepare(`
		SELECT id
		FROM conversations
		WHERE title = ?
  `);

    const result = stmt.get(title) as { id: number };

    return result?.id;
}

export function getMessagesForConvoRepo(conversationID: number){
    const stmt = db.prepare(`
		SELECT * 
		FROM messages
		WHERE id = ?
		ORDER BY createdAT;

	`);

	const result = stmt.all(conversationID) as Message[];
	return result;
}