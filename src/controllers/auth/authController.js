/**
 * Controlador de autenticación
 * @module AuthController
 */
import usersController from "../users/usersController.js";
import { verifyPassword } from "../../config/bcrypt.js";
import error from "../../helpers/errors.js";

/**
 * Registrar a un nuevo usuario
 * @async
 * @function register
 * @memberof module:AuthController
 * @param {string} username - El nombre de usuario
 * @param {string} email - El correo electrónico del usuario
 * @param {string} password - La contraseña
 * @param {string} passwordConfirm - La contraseña de confirmación
 * @param {string} name - El nombre de la persona
 * @param {string} surnames - Los apellidos de la persona
 * @returns {object} - Devuelve el usuario creado
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
 * @memberof module:AuthController
 * @param {string} email
 * @param {string} password
 * @returns {object} - Devuelve el usuario logueado
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
