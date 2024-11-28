import { Router } from "express";
import weekTimesApiController from "../controllers/week_times/weekTimesApiController.js";

const router = Router();

router.get("/", weekTimesApiController.getAll);
router.get("/date", weekTimesApiController.getAllByDate);
router.get("/:id", weekTimesApiController.getById);
router.post("/", weekTimesApiController.create);
router.put("/:id", weekTimesApiController.update);
router.delete("/:id", weekTimesApiController.remove);

export default router;
