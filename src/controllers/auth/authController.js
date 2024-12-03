/**
 * Controlador de autenticación
 * @namespace AuthController
 */
import usersController from "../users/usersController.js";
import { verifyPassword } from "../../config/bcrypt.js";
import error from "../../helpers/errors.js";

/**
 * Registrar a un nuevo usuario
 * @async
 * @function register
 * @memberof AuthController
 * @param {string} username - El nombre de usuario
 * @param {string} email - El correo electrónico del usuario
 * @param {string} password - La contraseña
 * @param {string} passwordConfirm - La contraseña de confirmación
 * @param {string} name - El nombre de la persona
 * @param {string} surnames - Los apellidos de la persona
 * @returns {object} - Devuelve el usuario creado
 * @throws {PASSWORD_NOT_MATCH} - Si las contraseñas no coinciden
 * @throws {EMAIL_ALREADY_EXISTS} - Si el correo ya esta registrado
 * @example
 * {
 *    "create_time": "2024-12-03T15:23:28.980Z",
 *    "id": 12,
 *    "username": "ejemplito",
 *    "email": "ejemplo@eje.com",
 *    "password": "$2a$10$zTxnqNvEF1nR/VntC7kUQOXREv3Si.2fwqsna4NS/5V6G7umJmahe",
 *    "name": "Pepe",
 *    "surnames": "Francisco Gonzales",
 *    "role": "client"
 * }
 */
async function register(
    username,
    email,
    password,
    passwordConfirm,
    name,
    surnames
) {
    if (password != passwordConfirm) {
        throw new error.PASSWORD_NOT_MATCH();
    }
    const oldUser = await usersController.getByEmail(email);
    if (oldUser) {
        throw new error.EMAIL_ALREADY_EXISTS();
    }
    const newUser = await usersController.create(
        username,
        email,
        password,
        name,
        surnames
    );
    return newUser;
}

/**
 * Iniciar sesión con correo electrónico y contraseña
 * @async
 * @function login
 * @memberof AuthController
 * @param {string} email
 * @param {string} password
 * @returns {object} - Devuelve el usuario logueado
 * @throws {USER_NOT_FOUND} - Si no ha encontrado el usuario
 * @throws {INVALID_CREDENTIALS} - Si  las credenciales son incorrectas
 *
 * @example
 * {
 *    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNzMzMjI0NjgyLCJleHAiOjE3MzMyMjgyODJ9.PTRYs2MjMAXtpiU8xUE48UdVZTmloQFsrlbhsVylN_U"
 * }
 */
async function login(email, password) {
    const user = await usersController.getByEmail(email);
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    const verified = await verifyPassword(password, user.password);
    if (!verified) {
        throw new error.INVALID_CREDENTIALS();
    }
    return user;
}

export default {
    register,
    login,
};
