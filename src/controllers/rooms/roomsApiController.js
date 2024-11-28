import roomsController from "./roomsController.js";
import errors from "../../helpers/errors.js";
async function getAll(req, res) {
    try {
        const rooms = await roomsController.getAll();
        res.json(rooms);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function getById(req, res) {
    try {
        const room = await roomsController.getById(req.params.id);
        res.json(room);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function create(req, res) {
    try {
        const name = req.body.name;
        const max_guests = parseInt(req.body.max_guests);
        const room = await roomsController.create(name, max_guests);
        res.status(201).json(room);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const name = req.body.name;
        const max_guests = parseInt(req.body.max_guests);
        const room = await roomsController.update(id, name, max_guests);
        res.json(room);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        const room = await roomsController.remove(id);
        res.json(room);
    } catch (error) {
        errors.handleError(res, error);
    }
}
export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
