import { User } from "../types/User";
import db from "../database/db";

export function createUser(user: User){
    const stmt = db.prepare(`
        INSERT INTO users (username, email, password) VALUES (?, ?, ?)    
    `);

    const result = stmt.run(user.username, user.email, user.password);
    return result;
}

// used in adduser for seeing if another user with the same name exists.
export function findUserByName(username: string) {
    const stmt = db.prepare(`
        SELECT *
        FROM users
        WHERE username = ?  
    `);

    const user = stmt.get(username); // use get() as we are only expecting one user to be returned.
    
     return user;
}

export function getUserById(userid: number){
    const stmt = db.prepare(`
        SELECT * 
        FROM users
        WHERE id = ?  
    `);

    const user = stmt.get(userid);

    return user;
}

export function getAllUsers(){
    const stmt = db.prepare(`
        SELECT * 
        FROM users
    `);

    const users = stmt.all() as User[];

    return users;
}

export function deleteUser(userid: number){
    const stmt = db.prepare(`
        DELETE 
        FROM users
        WHERE id = ?  
    `);

    const result = stmt.run(userid); // if result.changes === 0 then no user with that ID existed.

    return result;
}