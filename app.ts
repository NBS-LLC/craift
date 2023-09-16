import express from "express";
const app = express();

app.use(express.json());

app.get("/", function (_req, res) {
  res.json({ message: "crAIft" });
});

app.listen(3000);
