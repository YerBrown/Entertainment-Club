import { Router } from "express";
import roomsApiController from "../controllers/rooms/roomsApiController.js";

const router = Router();

router.get("/", roomsApiController.getAll);
router.get("/:id", roomsApiController.getById);
router.post("/", roomsApiController.create);
router.put("/:id", roomsApiController.update);
router.delete("/:id", roomsApiController.remove);

export default router;
