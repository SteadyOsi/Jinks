import {Request, Response } from "express";
import { User } from "../types/User";
import {users, nextUserId, incUserID } from "../data/userStore";

export function getUser(req: Request, res: Response){

    const username = req.params.username;

    const user = users.find(user => user.userName === username);

    if(user) {
        res.json(user);
    } else {
        return res.status(404).json({error: "data not found"});
    }
}

export function delUser(req: Request, res: Response){
    const username = req.params.username;

    //find matching message index
    const userIndex = users.findIndex(user => user.userName === username);

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
    const username = req.params.username;

    
}
