import { Router } from "express";
import authApiController from "../controllers/auth/authApiController.js";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único.
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 description: Correo electrónico único.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: "securePassword123"
 *               passwordConfirm:
 *                 type: string
 *                 description: Confirmacion de contraseña.
 *                 example: "securePassword123"
 *               name:
 *                 type: string
 *                 description: Nombre del cliente.
 *                 example: "John"
 *               surnames:
 *                 type: string
 *                 description: Apellidos del cliente.
 *                 example: "Fernandez Dominguez"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado con éxito."
 *       400:
 *         description: Correo electronico ya esta registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Este correo electrónico ya está registrado"
 *       400:
 *         description: Contraseñas no coinciden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Las contraseñas no coinciden"
 */
router.post("/register", authApiController.register);
router.post("/login", authApiController.login);

export default router;
