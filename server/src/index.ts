import express from "express";
import cors from "cors";
import { get } from "node:http";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

type Message = {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
}

const messages: Message[] = [];

app.get("/", (req, res) => {
    res.send("server is running");
});

app.get("/messages", (req, res) => {
    res.json(messages);
});

app.get("/messages/:id", (req, res) => {
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

app.post("/messages", (req, res) => {

    if(typeof req.body.sender === "string" && typeof req.body.content === "string" && req.body.sender.trim() !== "" && req.body.content.trim() !== ""){
        const newMessage: Message = {
            id: messages.length + 1,
            sender: req.body.sender,
            content: req.body.content,
            timestamp: new Date().toISOString()
        };

        messages.push(newMessage);

        res.json({
            success: true,
            message: newMessage
        });
        
    } else {
        res.status(400).send("Ya fucked up");
    }

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});