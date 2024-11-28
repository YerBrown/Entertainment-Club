import inventoryController from "./inventoryController.js";
import errors from "../../helpers/errors.js";

async function getAll(req, res) {
    try {
        const inventories = await inventoryController.getAll();
        res.json(inventories);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function getAmountOfGames(req, res) {
    try {
        const inventories = await inventoryController.getAmountOfGames();
        res.json(inventories);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function getById(req, res) {
    try {
        const inventory = await inventoryController.getById(req.params.id);
        res.json(inventory);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function create(req, res) {
    try {
        const game_id = parseInt(req.body.game_id);
        const inventory = await inventoryController.create(game_id);
        res.status(201).json(inventory);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const game_id = parseInt(req.body.game_id);
        const inventory = await inventoryController.update(id, game_id);
        res.json(inventory);
    } catch (error) {
        errors.handleError(res, error);
    }
}
async function remove(req, res) {
    try {
        const inventory = await inventoryController.getById(req.body);
        await inventory.destroy();
        res.status(204).send();
    } catch (error) {
        errors.handleError(res, error);
    }
}
export default {
    getAll,
    getAmountOfGames,
    getById,
    create,
    update,
    remove,
};
