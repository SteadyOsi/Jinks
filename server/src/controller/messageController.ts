import { Request, Response } from "express";
import { Message } from "../types/Message";
import { messages, nextId, incID } from "../data/messageStore";

export function getID(req: Request, res: Response) {
    // get id
    const id = parseInt(req.params.id as string);

    if(Number.isNaN(id)){
        return res.status(400).json({error: "Bad Request"});
    }

    //find matching message 
    const mes = messages.find(mes => mes.id === id);

    //If found 
    if(mes) {
        res.json(mes);
    } else { // otherwise
            return res.status(404).json({error: "data not found"});
    }
    
}

export function delID(req: Request, res: Response) {
    // get id
    const id = parseInt(req.params.id as string);

    if(Number.isNaN(id)){
        return res.status(400).json({error: "Bad Request"});
    }

    //find matching message index
    const mesIndex = messages.findIndex(mes => mes.id === id);

    //If found 
    if(mesIndex !== -1) {
        messages.splice(mesIndex, 1);
        res.status(204).send();
    } else { // otherwise
        return res.status(404).json({error: "data not found"});
    }

}

export function addMes(req: Request, res: Response) {

    if(typeof req.body.sender === "string" && typeof req.body.content === "string" && req.body.sender.trim() !== "" && req.body.content.trim() !== ""){
        const newMessage: Message = {
            id: nextId,
            sender: req.body.sender,
            content: req.body.content,
            timestamp: new Date().toISOString()
        };

        incID();

        messages.push(newMessage);

        res.json({
            success: true,
            message: newMessage
        });
        
    } else {
        res.status(400).send("Ya fucked up");
    }
}

export function updateMes(req: Request, res: Response) {
        // get id
    const id = parseInt(req.params.id as string);

    if(Number.isNaN(id)){
        return res.status(400).json({error: "ID must be a valid number"});
    }

    // validating body: 
    if(typeof req.body.content !== "string" || req.body.content.trim() === ""){
        return res.status(400).json({error: "content must be a non-empty string"});
    }

    //find matching message index
    const mesIndex = messages.findIndex(mes => mes.id === id);

    //If found 
    if(mesIndex !== -1) {
        messages[mesIndex].content = req.body.content;
        res.status(204).send();
    } else { // otherwise
        return res.status(404).json({error: "data not found"});
    }
}