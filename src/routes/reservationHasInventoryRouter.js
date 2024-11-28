import { Router } from "express";
import reservationsHasInventoryApiController from "../controllers/reservationsHasInventory/reservationsHasInventoryApiController.js";

const router = Router();

router.get("/", reservationsHasInventoryApiController.getAll);
router.get(
    "/inventory-items",
    reservationsHasInventoryApiController.getAllInventoryItemsOfReservation
);
router.post("/", reservationsHasInventoryApiController.create);
router.delete("/", reservationsHasInventoryApiController.remove);

export default router;
