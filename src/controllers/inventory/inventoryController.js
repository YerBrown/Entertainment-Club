/**
 * Controlador para gestionar el inventario de los juegos.
 * Este controlador incluye funciones para realizar operaciones CRUD (crear, leer, actualizar, eliminar) sobre el inventario de los juegos.
 *
 * @module InventoryController
 */

import sequelize from "../../config/sequelize.js";
import Inventory from "../../models/inventoryModel.js";
import Game from "../../models/gameModel.js";
import errors from "../../helpers/errors.js";
/**
 * Devuelve todos los artículos del inventario de juegos
 * @async
 * @function getAll
 * @memberof module:InventoryController
 * @returns {object[]} - Array de todos los articulos del inventario de juegos
 */
async function getAll() {
    const inventories = await Inventory.findAll({
        attributes: ["id"],
        include: {
            model: Game,
        },
    });
    return inventories;
}

/**
 * Devuelve la cantidad de cada juego en el inventario
 * @async
 * @function getAmountOfGames
 * @memberof module:InventoryController
 * @returns {object[]} - Array de objetos con la cantidad de cada juego en el inventario
 */
async function getAmountOfGames() {
    const inventories = await Inventory.findAll({
        attributes: [
            "game_id",
            [sequelize.fn("COUNT", sequelize.col("game_id")), "count"],
        ],
        group: ["game_id"],
        include: {
            model: Game,
        },
    });
    const gameAmounts = inventories.map((inventory) => ({
        game_id: inventory.game_id,
        game_name: inventory.game.name,
        game_description: inventory.game.description,
        amount: inventory.get("count"),
    }));
    return gameAmounts;
}
async function getById(id) {
    const inventory = await Inventory.findByPk(id, {
        attributes: ["id"],
        include: {
            model: Game,
        },
    });

    if (!inventory) {
        throw new errors.INVENTORY_ITEM_NOT_FOUND();
    }

    const inventoryData = {
        inventory_id: inventory.id,
        game_id: inventory.game.id,
        game_name: inventory.game.name,
        game_description: inventory.game.description,
    };
    return inventoryData;
}
async function getInventoryItemsOfGameId(game_id) {
    const inventoryItems = await Inventory.findAll({
        where: { game_id },
        attributes: ["id"],
        include: {
            model: Game,
        },
    });

    if (!inventoryItems || inventoryItems.length === 0) {
        throw new errors.NO_INVENTORY_ITEM_OF_THIS_GAME_FOUND();
    }

    const inventoryItemsData = inventoryItems.map((inventory) => ({
        inventory_id: inventory.id,
        game_id: inventory.game.id,
        game_name: inventory.game.name,
        game_description: inventory.game.description,
    }));
    return inventoryItemsData;
}
async function create(game_id) {
    const inventory = await Inventory.create({ game_id });
    return inventory;
}
async function update(id, game_id) {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) {
        throw new errors.INVENTORY_ITEM_NOT_FOUND();
    }

    await inventory.update(game_id);
    return inventory;
}
async function remove(id) {
    const inventory = await Inventory.findByPk(id);
    if (!inventory) {
        throw new errors.INVENTORY_ITEM_NOT_FOUND();
    }
    await inventory.destroy();
    return inventory;
}
export default {
    getAll,
    getAmountOfGames,
    getInventoryItemsOfGameId,
    getById,
    create,
    update,
    remove,
};
