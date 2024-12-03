import { Router } from "express";
import usersApiController from "../controllers/users/usersApiController.js";
import {
    isAuthenticated,
    isAdmin,
    isAdminOrSelfUser,
} from "../middlewares/authMiddleware.js";

const router = Router();
router.use(isAuthenticated);
router.get("/", isAdmin, usersApiController.getAll);
router.get("/my-profile", usersApiController.getMyProfile);
router.get("/:id", isAdmin, usersApiController.getById);
router.post("/", isAdmin, usersApiController.create);
router.put("/my-profile", usersApiController.updateMyProfile);
router.put("/:id", isAdmin, usersApiController.update);
router.delete("/:id", isAdmin, usersApiController.remove);

export default router;
