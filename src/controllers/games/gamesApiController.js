import gameController from "./gamesController.js";

async function getAll(req, res) {
    try {
        const games = await gameController.getAll();
        res.json(games);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function getById(req, res) {
    try {
        const game = await gameController.getById(req.params.id);
        res.json(game);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function create(req, res) {
    try {
        const game = await gameController.create(req.body);
        res.status(201).json(game);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function update(req, res) {
    try {
        const game = await gameController.getById(req.params.id);
        await game.update(req.body);
        res.json(game);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function remove(req, res) {
    try {
        const game = await gameController.getById(req.params.id);
        await game.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
