import express from "express";
const router = express.Router();

router.get("/random", (_req, res) => {
  res.json({ message: "crAIft" });
});

export default router;
