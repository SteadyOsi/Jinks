import {Request, Response } from "express";
import { User } from "../types/User";
import {users, nextUserId, incUserID } from "../data/userStore";

export function getUser(req: Request, res: Response){

    const userId = Number(req.params.userID);
    if (Number.isNaN(userId)) {
        return res.status(400).json({ error: "invalid userID" });
    }

    const user = users.find(user => user.userID === userId);

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

    // find matching user index
    const userIndex = users.findIndex(user => user.userID === userId);

    if(userIndex !== -1){
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        return res.status(404).json({error: "data not found"});
    }

}

export function addUser(req: Request, res: Response){

    if(typeof req.body.userName === "string" 
        && typeof req.body.email === "string" 
        && typeof req.body.passwordHashed === "string"
        && req.body.userName.trim() !== "" 
        && req.body.email.trim() !== ""
        && req.body.passwordHashed.trim() !== ""){

        if(users.find(user => user.userName === req.body.userName)){
            return res.status(400).json({error: "user name taken"});
        }

        const newUser: User = {
            userID: nextUserId,
            userName: req.body.userName,
            email: req.body.email,
            passwordHashed: req.body.passwordHashed
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

export function updateUser(req: Request, res: Response){
    const userId = Number(req.params.userID);
    if (Number.isNaN(userId)) {
        return res.status(400).json({ error: "invalid userID" });
    }

    const user = users.find(user => user.userID === userId);
    if (!user) {
        return res.status(404).json({ error: "data not found" });
    }

    const updates: Partial<User> = {};

    if (req.body.userName !== undefined) {
        if (typeof req.body.userName !== "string" || req.body.userName.trim() === "") {
            return res.status(400).json({ error: "invalid userName" });
        }
        const duplicate = users.find(u => u.userName === req.body.userName && u.userID !== userId);
        if (duplicate) {
            return res.status(400).json({ error: "user name taken" });
        }
        updates.userName = req.body.userName;
    }

    if (req.body.email !== undefined) {
        if (typeof req.body.email !== "string" || req.body.email.trim() === "") {
            return res.status(400).json({ error: "invalid email" });
        }
        updates.email = req.body.email;
    }

    if (req.body.passwordHashed !== undefined) {
        if (typeof req.body.passwordHashed !== "string" || req.body.passwordHashed.trim() === "") {
            return res.status(400).json({ error: "invalid passwordHashed" });
        }
        updates.passwordHashed = req.body.passwordHashed;
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "no valid fields to update" });
    }

    Object.assign(user, updates);
    res.json({ success: true, message: user });
}
