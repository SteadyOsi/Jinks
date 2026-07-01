import {Request, Response } from "express";
import { User } from "../types/User";
import { createUser, getUserById, deleteUser } from "../repositories/userRepository";
import argon2 from "argon2";

export function getUser(req: Request, res: Response){

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

        if(users.find(user => user.userName === req.body.userName)){
            return res.status(400).json({error: "user name taken"});
        }

        const newUser: User = {
            userID: nextUserId,
            username: req.body.userName,
            email: req.body.email,
            password: await argon2.hash(req.body.password)
        };

        incUserID();

        users.push(newUser);

        res.json({
            success: true,
            message: newUser
        });
        
    } else {
        res.status(400).send("Ya fucked up");
    }

}

export async function updateUser(req: Request, res: Response) {

    const userId = Number(req.params.userID);

    if (Number.isNaN(userId)) {
        return res.status(400).json({error: "invalid userID"});
    }

    const userIndex = users.findIndex(user => user.userID === userId);

    if (userIndex === -1) {
        return res.status(404).json({error: "user not found"});
    }

    const username = req.body.username;
    const email = req.body.email;
    const password = await argon2.hash(req.body.password);

    // Username update
    if (username !== undefined) {

        if (typeof username !== "string" || username.trim() === "") {
            return res.status(400).json({error: "username must be a non-empty string"});
        }

        const existingUser = users.find(
            user =>
                user.userName === username &&
                user.userID !== userId
        );

        if (existingUser) {
            return res.status(400).json({error: "username already taken"});
        }

        users[userIndex].userName = username;
    }

    // Email update
    if (email !== undefined) {

        if (typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({error: "email must be a non-empty string"});
        }

        users[userIndex].email = email;
    }

    // Password update
    if (password !== undefined) {

        if (typeof password !== "string" || password.trim() === "") {
            return res.status(400).json({error: "password must be a non-empty string"});
        }

        users[userIndex].password = password;
    }

    return res.status(200).json(users[userIndex]);
}
