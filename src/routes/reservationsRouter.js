import { Router } from "express";
import reservationsApiController from "../controllers/reservations/reservationApiController.js";

const router = Router();

router.get("/", reservationsApiController.getAll);
router.get("/free-date", reservationsApiController.getFreeTimesByDate);
router.get("/:id", reservationsApiController.getById);
router.post("/", reservationsApiController.create);
router.put("/:id", reservationsApiController.update);
router.delete("/:id", reservationsApiController.remove);

export default router;
