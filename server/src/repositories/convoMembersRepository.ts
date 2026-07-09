import db from "../database/db";
import { ConvoMember } from "../types/ConvoMember";

// adds a person to a chat effectly
export function createMemberRepo(member: ConvoMember) {
        const stmt = db.prepare(`
        INSERT INTO conversationMembers (conversationID, userID) VALUES (?,?);
    `);

        const result = stmt.run(member.conversationID, member.userID);
        return result;
}
