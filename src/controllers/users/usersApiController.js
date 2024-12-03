import usersController from "./usersController.js";
import errors from "../../helpers/errors.js";
import jwt from "../../config/jwt.js";

async function getAll(req, res) {
    try {
        const users = await usersController.getAll();
        res.json(users);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getById(req, res) {
    try {
        const user = await usersController.getById(req.params.id);
        res.json(user);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getMyProfile(req, res) {
    try {
        const tokenPayload = jwt.getTokenPayload(req);
        const my_id = tokenPayload.user_id;
        const user = await usersController.getMyProfile(my_id);
        res.json(user);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function create(req, res) {
    try {
        const { username, email, password, name, surnames } = req.body;

        const user = await usersController.create(
            username,
            email,
            password,
            name,
            surnames
        );
        res.status(201).json(user);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { username, email, password, name, surnames } = req.body;
        const user = await usersController.update(
            id,
            username,
            email,
            password,
            name,
            surnames
        );
        res.json(user);
    } catch (error) {
        errors.handleError(res, error);
    }
}
/**
 * Obtener los datos de mi usuario
 * @async
 * @function updateMyProfile
 * @memberof module:UsersController
 * @param {Request} req - request de http, que contiene en el body, los datos de username, email, password, name y surnames  con los que se actualiza el usuario.
 * @param {Response} res - response de http
 * @returns {object} - Objeto con los datos de mi usuario actualizado
 */
async function updateMyProfile(req, res) {
    try {
        const tokenPayload = jwt.getTokenPayload(req);
        const { username, email, password, name, surnames } = req.body;
        const user = await usersController.update(
            tokenPayload.user_id,
            username,
            email,
            password,
            name,
            surnames
        );
        res.json(user);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await usersController.remove(id);
        res.json(user);
    } catch (error) {
        errors.handleError(res, error);
    }
}

export default {
    getAll,
    getById,
    getMyProfile,
    create,
    update,
    updateMyProfile,
    remove,
};
