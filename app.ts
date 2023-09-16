import express from "express";
import treasureRouter from "./api/treasure/router";

const app = express();
app.use(express.json());

app.use("/api/treasures", treasureRouter);

export default app;
