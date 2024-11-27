import { Router } from "express";
import gameApiController from "../controllers/games/gamesApiController.js";

const router = Router();

router.get("/", gameApiController.getAll);

export default router;
