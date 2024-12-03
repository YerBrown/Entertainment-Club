import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import router from "./routes/router.js";
// const swaggerUi = require("swagger-ui-express");
// const swaggerSpec = require("./swagger");
dotenv.config();

const app = express();

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.listen(3000, () => {
    console.log(
        `Servidor escuchando en http://localhost:${process.env.APP_PORT}`
    );
});
