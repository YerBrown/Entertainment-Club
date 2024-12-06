import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import router from "./routes/router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../openapi.json" assert { type: "json" };
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(3000, () => {
    console.log(
        `Servidor escuchando en http://localhost:${process.env.APP_PORT}`
    );
});
