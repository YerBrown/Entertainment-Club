import { Router } from "express";
import gameApiController from "../controllers/games/gamesApiController.js";

const router = Router();

router.get("/", gameApiController.getAll);
router.get("/:id", gameApiController.getById);
router.post("/", gameApiController.create);
router.put("/:id", gameApiController.update);
router.delete("/:id", gameApiController.remove);

export default router;
