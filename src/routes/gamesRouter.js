import { Router } from "express";
import gameApiController from "../controllers/games/gamesApiController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();
router.use(isAuthenticated);
router.get("/", gameApiController.getAll);
router.get("/:id", gameApiController.getById);
router.post("/", isAdmin, gameApiController.create);
router.put("/:id", isAdmin, gameApiController.update);
router.delete("/:id", isAdmin, gameApiController.remove);
export default router;
