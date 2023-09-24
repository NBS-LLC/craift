import express from "express";
import { getRandomTreasure } from "./controller";
const router = express.Router();

router.get("/random", async (_req, res) => {
  res.json(await getRandomTreasure());
});

export default router;
