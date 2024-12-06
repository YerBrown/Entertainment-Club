import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Entertainment Club API",
            version: "1.0.0",
            description:
                "API para gestionar reservas, juegos y usuarios en un club de entretenimiento",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);
