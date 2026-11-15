import Database from "better-sqlite3";

// Open the SQLite database file used by the repositories.
const db = new Database("jinksData.db", {
    verbose: console.log
});

export default db;
