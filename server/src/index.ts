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
    let urlID = parseInt(req.url.split('/')[2]);

    if(isNaN(urlID)){
        res.status(400).send("Unexpected input");
    } else {
        
        messages.forEach(element => {
            if(element.id === urlID){
                res.json(element);
            } 
        });
        res.status(404).send("No data with that ID");
    };
    
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