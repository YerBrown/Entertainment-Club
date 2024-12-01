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
router.get("/:id", isAdmin, usersApiController.getById);
router.get("/my-profile", usersApiController.getMyProfile);
router.post("/", usersApiController.create);
router.put("/:id", isAdminOrSelfUser, usersApiController.update);
router.delete("/:id", isAdminOrSelfUser, usersApiController.remove);

export default router;
