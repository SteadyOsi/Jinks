import db from "./db";

export function initaliseDbTables() {
    const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password STRING NOT NULL
        )
    `;

    db.exec(usersTable);

    const messageTable = `
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            senderID INTEGER NOT NULL,
            receiverID INTEGER NOT NULL,
            content TEXT NOT NULL,
            createdAT TEXT NOT NULL 
        )
    `;
    db.exec(messageTable);
}