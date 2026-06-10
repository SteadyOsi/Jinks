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
    (?, ?, ?)
`);

stmt.run('jack', 'pill@example.com', '21');
stmt.run('phill', 'phill@example.com', '33');
stmt.run('Tom', 'tom@example.com', '34');
stmt.run('jessica', 'jess@example.com', '19');

const stmt2 = db.prepare(`SELECT * FROM people`);
const people = stmt2.all();

// const stmt3 = db.prepare(`DELETE FROM people WHERE people.id == 2`);
// stmt3.run();

const stmt4 = db.prepare(`SELECT * FROM people`);
const people2 = stmt4.all();

console.log(people);
console.log("");
console.log(people2);
db.close();