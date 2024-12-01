import { Router } from "express";
import inventoryApiController from "../controllers/inventory/inventoryApiController.js";
import {
    isAuthenticated,
    isAdmin,
    isAdminOrSelfUser,
} from "../middlewares/authMiddleware.js";
const router = Router();

router.use(isAuthenticated);
router.get("/", inventoryApiController.getAll);
router.get("/amount-of-games", inventoryApiController.getAmountOfGames);
router.get("/game/:game_id", inventoryApiController.getInventoryItemsOfGameId);
router.get("/:id", inventoryApiController.getById);
router.post("/", inventoryApiController.create);
router.put("/:id", inventoryApiController.update);
router.delete("/:id", inventoryApiController.remove);

export default router;
