import db from "./db";

// creates the tables for user and message if they don't exist

export function initaliseDbTables() {
    const usersTable = `
        CREATE TABLE IF NOT EXIST users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password STRING NOT NULL
        )
    `;

    const messageTable = `
        CREATE TABLE IF NOT EXIST messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            senderID int,
            contents TEXT,
            time_stamp timestamp 
        )
    `;

    db.exec(usersTable);
    db.exec(messageTable);
}