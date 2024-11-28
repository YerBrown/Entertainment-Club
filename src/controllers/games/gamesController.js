import sequelize from "../../config/sequelize.js";
import { Op } from "sequelize";
import Game from "../../models/gameModel.js";
import errors from "../../helpers/errors.js";

async function getAll() {
    const games = await Game.findAll();
    return games;
}
async function getById(id) {
    const game = await Game.findByPk(id);
    return game;
}
async function create(gameData) {
    const game = await Game.create(gameData);
    return game;
}
async function update(id, gameData) {
    const game = await Game.findByPk(id);
    if (!game) {
        throw new errors.GAME_NOT_FOUND();
    }
    await game.update(gameData);
    return game;
}
async function remove(id) {
    const game = await Game.findByPk(id);
    if (!game) {
        throw new errors.GAME_NOT_FOUND();
    }
    await game.destroy();
    return game;
}
export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
