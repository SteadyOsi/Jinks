import {Request, Response } from "express";
import { User } from "../types/User";
import { createUser, getUserById, deleteUser, updateUserName, updateUserEmail, updateUserPassword } from "../repositories/userRepository";
import argon2 from "argon2";

export function getUser(req: Request, res: Response){ // get's user by ID

    const userId = Number(req.params.userID);
    if (Number.isNaN(userId)) {
        return res.status(400).json({ error: "invalid userID" });
    }

    const user = getUserById(userId);

    if(user) {
        res.json(user);
    } else {
        return res.status(404).json({error: "data not found"});
    }
}

export function delUser(req: Request, res: Response){
    const userId = Number(req.params.userID);

    if (Number.isNaN(userId)) {
        return res.status(400).json({ error: "invalid userID" });
    }

    const resultFromDel = deleteUser(userId);

    if(resultFromDel.changes === 0){
        return res.status(404).json({error: "data not found"});
        
    } else {
        return res.status(204).send();
    }
}

// added async for hashing password
export async function addUser(req: Request, res: Response){

    if(typeof req.body.userName === "string" 
        && typeof req.body.email === "string" 
        && typeof req.body.password === "string"
        && req.body.userName.trim() !== "" 
        && req.body.email.trim() !== ""
        && req.body.password.trim() !== ""){

        const newUser: User = {
            userID: -1,
            username: req.body.userName,
            email: req.body.email,
            password: await argon2.hash(req.body.password)
        };

        const CreationResult = createUser(newUser);

        if(!CreationResult){
            return res.status(400).json({error: "error occured in creating this user"}); 
        }

        res.json({
            success: true,
            message: newUser
        });
        
    } else {
        return res.status(400).send("Bad request");
    }

}


// This function needs to be optimised: 
// - possible errors, some things can update but may hit a error later. now shoing that the eariler changes happend.
// - 
export async function updateUser(req: Request, res: Response) {

    const userId = Number(req.params.userID); // grabs Id 
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (Number.isNaN(userId)) { // validates ID number in request
        return res.status(400).json({error: "invalid userID"});
    }

    // Username update
    if (username !== undefined) {

        if (typeof username !== "string" || username.trim() === "") { // input checks
            return res.status(400).json({error: "username must be a non-empty string"});
        }

        const userNameUpdateResult = updateUserName(userId, username);

        if (!userNameUpdateResult) {
            return res.status(400).json({error: "error updating username"});
        }
    }

    
    if (email !== undefined) { // Email update

        if (typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({error: "email must be a non-empty string"});
        }

        const emailUpdateResult = updateUserEmail(userId, email);

        if (!emailUpdateResult) {
            return res.status(400).json({error: "error updating email"});
        }
    }

    
    if (password !== undefined) { // Password update

        if (typeof password !== "string" || password.trim() === "") {
            return res.status(400).json({error: "password must be a non-empty string"});
        }

        const passwordUpdateResult = updateUserPassword(userId, await argon2.hash(password));

        if (!passwordUpdateResult) {
            return res.status(400).json({error: "error updating password"});
        }
    }

    return res.status(200).json(getUserById(userId));
}
