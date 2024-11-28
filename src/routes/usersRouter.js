import { Router } from "express";
import usersApiController from "../controllers/users/usersApiController.js";

const router = Router();

router.get("/", usersApiController.getAll);
router.get("/:id", usersApiController.getById);
router.post("/", usersApiController.create);
router.put("/:id", usersApiController.update);
router.delete("/:id", usersApiController.remove);

export default router;
