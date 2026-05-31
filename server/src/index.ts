import express from "express";
import cors from "cors";
import messageRouter from "./routes/messageRoutes";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("server is running");
});

app.use("/messages/", messageRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});