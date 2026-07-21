import db from "./db";

export function initaliseDbTables() {
        //Users
        const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    `;
        db.exec(usersTable);

        // Messages
        const messageTable = `
        CREATE TABLE IF NOT EXISTS messages (

            id INTEGER PRIMARY KEY AUTOINCREMENT,
        
            senderID INTEGER NOT NULL,
            conversationID INTEGER NOT NULL,
        
            content TEXT NOT NULL,
            createdAT TEXT NOT NULL,

            FOREIGN KEY(senderID) REFERENCES users(id),
            FOREIGN KEY(conversationID) REFERENCES conversations(id)
        )
    `;
        db.exec(messageTable);

        // Conversations
        const conversationsTable = `
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            createdAT TEXT NOT NULL,
            title TEXT
        )
    `;

        db.exec(conversationsTable);

        // conversation_members
        const conversation_Members_Table = `
        CREATE TABLE IF NOT EXISTS conversationMembers (
            conversationID INTEGER NOT NULL,
            userID INTEGER NOT NULL,

            FOREIGN KEY(conversationID) REFERENCES conversations(id),
            FOREIGN KEY(userID) REFERENCES users(id)
        )
    `;

        db.exec(conversation_Members_Table);
}
