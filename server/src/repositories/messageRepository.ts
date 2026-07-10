import { Message } from "../types/Message";
import db from "../database/db";

export function getAllMessages() {
  // used in testing
  const stmt = db.prepare(`
        SELECT *
        FROM messages
    `);

  const messages = stmt.all() as Message[];

  return messages;
}

export function getMesByMesId(mesId: number) {
  const stmt = db.prepare(`
        SELECT *
        FROM messages
        WHERE id = ?
    `);

  const messages = stmt.get(mesId) as Message;

  return messages;
}

export function addMessage(mes: Message) {
  const stmt = db.prepare(`
        INSERT INTO messages (senderID, conversationID, content, createdAT) VALUES (?, ?, ?, ?)    
    `);

  const result = stmt.run(
    mes.senderID,
    mes.conversationID,
    mes.content,
    mes.createdAT,
  );
  return result;
}

export function delMesByMesId(mesId: number) {
  const stmt = db.prepare(`
        DELETE 
        FROM messages
        WHERE id = ?  
    `);

  const result = stmt.run(mesId); // if result.changes === 0 then no user with that ID existed.

  return result;
}

export function updateMesByMesId(mesId: number, mesContent: String) {
  const stmt = db.prepare(`
        UPDATE messages
        SET content = ?
        WHERE id = ?
    `);

  const result = stmt.run(mesContent, mesId);

  return result;
}

export function getConvoByIdS(userIdOne: number, userIdTwo: number) {
  const stmt = db.prepare(`
        SELECT *
        FROM messages
        WHERE (senderID = ? and receiverID = ?) OR (senderID = ? and receiverID = ?)
        ORDER BY createdAT;
    `);

  const messages = stmt.all(
    userIdOne,
    userIdTwo,
    userIdTwo,
    userIdOne,
  ) as Message[];

  return messages;
}
