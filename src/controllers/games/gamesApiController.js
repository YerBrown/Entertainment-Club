import gameController from "./gamesController.js";
import errors from "../../helpers/errors.js";

async function getAll(req, res) {
    try {
        const games = await gameController.getAll();
        res.json(games);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getById(req, res) {
    try {
        const game = await gameController.getById(req.params.id);
        res.json(game);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function create(req, res) {
    try {
        const game = await gameController.create(req.body);
        res.status(201).json(game);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function update(req, res) {
    try {
        const id = req.params.id;
        const game = await gameController.update(id, req.params.id);
        res.json(game);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function remove(req, res) {
    try {
        const game = await gameController.getById(req.params.id);
        await game.destroy();
        res.status(204).send();
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
