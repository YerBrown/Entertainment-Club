import { Router } from "express";
import inventoryApiController from "../controllers/inventory/inventoryApiController.js";

const router = Router();

router.get("/", inventoryApiController.getAll);
router.get("/amount-of-games", inventoryApiController.getAmountOfGames);
router.get("/:id", inventoryApiController.getById);
router.post("/", inventoryApiController.create);
router.put("/:id", inventoryApiController.update);
router.delete("/:id", inventoryApiController.remove);

export default router;
