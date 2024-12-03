import { Router } from "express";
import weekTimesApiController from "../controllers/week_times/weekTimesApiController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(isAuthenticated);
router.get("/", isAdmin, weekTimesApiController.getAll);
router.get("/date", weekTimesApiController.getAllByDate);
router.get("/:id", weekTimesApiController.getById);
router.post("/", isAdmin, weekTimesApiController.create);
router.put("/:id", isAdmin, weekTimesApiController.update);
router.delete("/:id", isAdmin, weekTimesApiController.remove);

export default router;
