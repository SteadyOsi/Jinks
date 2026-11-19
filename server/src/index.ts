import express from "express";
import cors from "cors";
import messageRouter from "./services/messages/routes";
import userRouter from "./services/users/routes";
import conversationRouter from "./services/conversations/routes";
import { initaliseDbTables } from "./database/schema";

// Make sure the database schema exists before any route can query it.
initaliseDbTables();

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
        res.send("server is running");
});

// Mount each feature's endpoints under its own URL prefix.
app.use("/messages/", messageRouter);
app.use("/user/", userRouter);
app.use("/conversations/", conversationRouter);

app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
});

// TODO: expose a route that returns messages for a conversation.
