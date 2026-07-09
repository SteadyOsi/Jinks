import express from "express";
import cors from "cors";
import messageRouter from "./routes/messageRoutes";
import userRouter from "./routes/userRoutes";
import conversationRouter from "./routes/conversationsRoutes";
import { initaliseDbTables } from "./database/schema";

// creates DB tables if not already done
initaliseDbTables();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
        res.send("server is running");
});

app.use("/messages/", messageRouter);
app.use("/user/", userRouter);
app.use("/conversations/", conversationRouter);

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
});

// next thing to do next is sorting out the members when creating a conversation [x]
// also need to get the messages of the conversation. []
