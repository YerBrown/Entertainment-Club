import { Router } from "express";
import reservationsApiController from "../controllers/reservations/reservationApiController.js";
import {
    isAuthenticated,
    isAdmin,
    isAdminOrSelfUser,
} from "../middlewares/authMiddleware.js";
const router = Router();

router.use(isAuthenticated);
router.get("/", isAdmin, reservationsApiController.getAll);
router.get("/free-date", reservationsApiController.getFreeTimesByDate);
router.get(
    "/free-items-by-date-time",
    reservationsApiController.getAvailableInventoryItemsByDateTime
);
router.get("/my-reservations", reservationsApiController.getMyReservations);
router.get("/:id", isAdmin, reservationsApiController.getById);
router.get("/user/:user_id", isAdmin, reservationsApiController.getByUserId);
router.get("/:id/full-data", reservationsApiController.getFullInformationById);
router.post("/", isAdmin, reservationsApiController.create);
router.post("/new", reservationsApiController.createNewReservation);
router.put("/:id", isAdmin, reservationsApiController.update);
router.delete("/:id", isAdmin, reservationsApiController.remove);
router.delete("/user/:id", reservationsApiController.removeMyReservation);

export default router;
