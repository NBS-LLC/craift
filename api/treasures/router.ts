import express from "express";
import { TreasureController } from "./controller";

const controller = TreasureController.create();
const router = express.Router();

router.get("/random", async (_req, res) => {
  res.json(await controller.getRandomTreasure());
});

export default router;
