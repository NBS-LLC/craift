import express from "express";
import treasureRoute from "./api/treasure/treasure-route";

const app = express();
app.use(express.json());

app.use("/api/treasure", treasureRoute);

app.listen(3000);
