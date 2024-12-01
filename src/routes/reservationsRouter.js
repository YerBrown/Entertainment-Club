import { Router } from "express";
import reservationsApiController from "../controllers/reservations/reservationApiController.js";
import {
    isAuthenticated,
    isAdmin,
    isAdminOrSelfUser,
} from "../middlewares/authMiddleware.js";
const router = Router();

router.use(isAuthenticated);
router.get("/", reservationsApiController.getAll);
router.get("/free-date", reservationsApiController.getFreeTimesByDate);
router.get(
    "/free_items-by-date-time",
    reservationsApiController.getAvailableInventoryItemsByDateTime
);
router.get("/:id", reservationsApiController.getById);
router.post("/", reservationsApiController.create);
router.put("/:id", reservationsApiController.update);
router.delete("/:id", reservationsApiController.remove);

export default router;
