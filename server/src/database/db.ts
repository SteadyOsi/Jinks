const Database = require('better-sqlite3');
const db = new Database('jinksData.db', { verbose: console.log });

const firstTable = `
    CREATE TABLE IF NOT EXISTS people (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER
    )
`;

db.exec(firstTable);
const addData = `
    INSERT INTO people (name, email, age) VALUES
    ('JACK', 'JACK@example.com', 30)
    `;

db.exec(addData);


const sql = `SELECT * FROM people`;

const stmt = db.prepare(sql);
const people = stmt.all();

console.log(people);

db.close();