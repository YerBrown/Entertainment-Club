import { Router } from "express";
import roomsApiController from "../controllers/rooms/roomsApiController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";
const router = Router();
router.use(isAuthenticated);
router.get("/", roomsApiController.getAll);
router.get("/:id", roomsApiController.getById);
router.post("/", isAdmin, roomsApiController.create);
router.put("/:id", isAdmin, roomsApiController.update);
router.delete("/:id", isAdmin, roomsApiController.remove);

export default router;
