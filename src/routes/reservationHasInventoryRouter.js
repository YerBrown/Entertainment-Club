import { Router } from "express";
import reservationsHasInventoryApiController from "../controllers/reservationsHasInventory/reservationsHasInventoryApiController.js";
import {
    isAuthenticated,
    isAdmin,
    isAdminOrSelfUser,
} from "../middlewares/authMiddleware.js";
const router = Router();

router.use(isAuthenticated);
router.get("/", isAdmin, reservationsHasInventoryApiController.getAll);
router.get(
    "/inventory-items",
    reservationsHasInventoryApiController.getAllInventoryItemsOfReservation
);
router.get(
    "/available-inventory-item",
    reservationsHasInventoryApiController.getAvailableInventoryItemByDateAndWeekTime
);
router.post(
    "/add-item",
    reservationsHasInventoryApiController.addInventoryItemToReservation
);
router.post("/", isAdmin, reservationsHasInventoryApiController.create);
router.delete("/", isAdmin, reservationsHasInventoryApiController.remove);
router.delete(
    "/remove-game",
    reservationsHasInventoryApiController.removeGameFromReservations
);

export default router;
