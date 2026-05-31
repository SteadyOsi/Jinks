import { Router } from "express";
import { Message } from "../types/Messages";

const router = Router();

const messages: Message[] = [];
let nextId = 1;

router.get("/", (req, res) => {
    res.json(messages);
});

router.get("/:id", (req, res) => {
    // get id
    const id = parseInt(req.params.id);

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
    
});

router.delete("/:id", (req, res) => {
    // get id
    const id = parseInt(req.params.id);

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

});

router.post("/", (req, res) => {

    if(typeof req.body.sender === "string" && typeof req.body.content === "string" && req.body.sender.trim() !== "" && req.body.content.trim() !== ""){
        const newMessage: Message = {
            id: nextId,
            sender: req.body.sender,
            content: req.body.content,
            timestamp: new Date().toISOString()
        };

        nextId += 1;

        messages.push(newMessage);

        res.json({
            success: true,
            message: newMessage
        });
        
    } else {
        res.status(400).send("Ya fucked up");
    }

});

router.patch("/:id", (req, res) => {
        // get id
    const id = parseInt(req.params.id);

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
});

export default router;