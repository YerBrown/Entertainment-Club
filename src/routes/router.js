import { Router } from "express";
import gamesRouter from "./gamesRouter.js";
const router = Router();

router.use("/games", gamesRouter);
router.get("/", (req, res) => {
    res.send("API Connected");
});
export default router;
