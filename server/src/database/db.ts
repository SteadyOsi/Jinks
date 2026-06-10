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

const stmt = db.prepare(`
    INSERT INTO people (name, email, age) VALUES
    ('terry', 'bp@example.com', 30),
    ('john', 'john@example.com', 25),
    ('blue', 'Bluey@example.com', 4),
    ('jack', 'jack@example.com', 22),
    ('Tom', 'tom@example.com', 23)
`);

stmt.run();

const stmt2 = db.prepare(`SELECT * FROM people`);
const people = stmt2.all();

const stmt3 = db.prepare(`DELETE FROM people WHERE people.id == 2`);
stmt3.run();

const stmt4 = db.prepare(`SELECT * FROM people`);
const people2 = stmt4.all();

console.log(people);
console.log(people2);
db.close();