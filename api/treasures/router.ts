import express from "express";
import { getRandomTreasure } from "./controller";
const router = express.Router();

router.get("/random", (_req, res) => {
  res.json(getRandomTreasure());
});

export default router;
