import { Conversations } from "../types/Conversations";
import db from "../database/db";

export function getAllConvoRepo(){
    const stmt = db.prepare(`
        SELECT *
        FROM conversations
    `);
}
