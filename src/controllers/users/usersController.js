import sequelize from "../../config/sequelize.js";
import { Op } from "sequelize";
import User from "../..//models/userModel.js";
import errors from "../../helpers/errors.js";
import { hashPassword } from "../../config/bcrypt.js";
import jwt from "../../config/jwt.js";
/**
 * Controlador para gestionar los usuarios
 *
 * @namespace UsersController
 */
async function getAll() {
    const users = await User.findAll();
    return users;
}
async function getById(id) {
    const user = await User.findByPk(id);
    return user;
}
/**
 * Obtener los datos de mi usuario
 * @async
 * @function getMyProfile
 * @memberof UsersController
 * @param {number} id - id de mi usuario
 * @returns {object} - Objeto con los datos de mi usuario
 * @throws {USER_NOT_FOUND} - Si no encuentra el usuario
 * @example
 * {
 *    "id": 1,
 *    "username": "iker89",
 *    "email": "iker89@example.com",
 *    "name": "Iker",
 *    "surnames": "García Aranburu"
 * }
 */
async function getMyProfile(id) {
    const user = await User.findByPk(id);
    if (!user) {
        throw new errors.USER_NOT_FOUND();
    }
    const myUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        surnames: user.surnames,
    };
    return myUser;
}
async function getByEmail(email) {
    const user = await User.findOne({ where: { email } });
    return user;
}
async function create(username, email, password, name, surnames) {
    const oldUser = await getByEmail(email);
    if (oldUser) {
        throw new errors.EMAIL_ALREADY_EXISTS();
    }
    const hash = await hashPassword(password);
    const newUser = await User.create({
        username,
        email,
        password: hash,
        name,
        surnames,
        role: "client",
    });
    return newUser;
}
async function update(id, username, email, password, name, surnames) {
    const user = await User.findByPk(id);
    if (!user) {
        throw new errors.USER_NOT_FOUND();
    }
    const hash = await hashPassword(password);
    await user.update({
        username,
        email,
        password: hash,
        name,
        surnames,
    });
    return user;
}
async function remove(id) {
    const user = await User.findByPk(id);
    if (!user) {
        throw new errors.USER_NOT_FOUND();
    }

    await user.destroy();
    return user;
}
export default {
    getAll,
    getById,
    getMyProfile,
    getByEmail,
    create,
    update,
    remove,
};
