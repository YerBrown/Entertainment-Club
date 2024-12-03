import { Router } from "express";
import inventoryApiController from "../controllers/inventory/inventoryApiController.js";
import {
    isAuthenticated,
    isAdmin,
    isAdminOrSelfUser,
} from "../middlewares/authMiddleware.js";
const router = Router();
router.use(isAuthenticated);
router.get("/", isAdmin, inventoryApiController.getAll);
router.get("/amount-of-games", inventoryApiController.getAmountOfGames);
router.get("/game/:game_id", inventoryApiController.getInventoryItemsOfGameId);
router.get("/:id", isAdmin, inventoryApiController.getById);
router.post("/", isAdmin, inventoryApiController.create);
router.put("/:id", isAdmin, inventoryApiController.update);
router.delete("/:id", isAdmin, inventoryApiController.remove);

export default router;
