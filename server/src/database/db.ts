import Database from "better-sqlite3";

const db = new Database("jinksData.db", {
    verbose: console.log
});

export default db;
