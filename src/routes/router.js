import { Router } from "express";
import authRouter from "./authRouter.js";
import gamesRouter from "./gamesRouter.js";
import inventoryRouter from "./inventoryRouter.js";
import roomsRouter from "./roomsRouter.js";
import weekTimesRouter from "./weekTimesRouter.js";
import usersRouter from "./usersRouter.js";
import reservationsRouter from "./reservationsRouter.js";
import reservationHasInventoryRouter from "./reservationHasInventoryRouter.js";
const router = Router();

router.get("/", (req, res) => {
    res.send("API Connected");
});

router.use("/", authRouter);

router.use("/games", gamesRouter);
router.use("/inventory", inventoryRouter);
router.use("/rooms", roomsRouter);
router.use("/week-times", weekTimesRouter);
router.use("/users", usersRouter);
router.use("/reservations", reservationsRouter);
router.use("/reservations-has-inventory", reservationHasInventoryRouter);

export default router;
