import { User } from "../types/User";
import db from "../database/db";

export function createUser(user: User){
    const stmt = db.prepare(`
        INSERT INTO users (username, email password) VALUES (?, ?, ?)    
    `);

    stmt.run(user.username, user.email, user.password);
    
}

export function getUserById(userid: number){
    const stmt = db.prepare(`
        SELECT * 
        FROM users
        WHERE id = ?  
    `);

    const user = stmt.get(1);

    return user;
}

export function getAllUsers(){
    const stmt = db.prepare(`
        SELECT * 
        FROM users
    `);

    const users = stmt.all();

    return users;
}

export function deleteUser(userid: number){
    const stmt = db.prepare(`
        DELETE 
        FROM users
        WHERE id = ?  
    `);

    stmt.run(userid);
}