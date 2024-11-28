import weekTimesController from "./weekTimesController.js";
import errors from "../../helpers/errors.js";

async function getAll(req, res) {
    try {
        const weekTimes = await weekTimesController.getAll();
        res.json(weekTimes);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getById(req, res) {
    try {
        const weekTime = await weekTimesController.getById(req.params.id);
        res.json(weekTime);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function getAllByDate(req, res) {
    try {
        const weekTimes = await weekTimesController.getAllByDate(req.body.date);
        res.json(weekTimes);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function create(req, res) {
    try {
        const { week_day, time } = req.body;
        const weekTime = await weekTimesController.create(
            parseInt(week_day),
            time
        );
        res.json(weekTime);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function update(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { week_day, time } = req.body;
        const weekTime = await weekTimesController.update(
            id,
            parseInt(week_day),
            time
        );
        res.json(weekTime);
    } catch (error) {
        errors.handleError(res, error);
    }
}

async function remove(req, res) {
    try {
        const id = parseInt(req.params.id);
        const weekTime = await weekTimesController.remove(id);
        res.json(weekTime);
    } catch (error) {
        errors.handleError(res, error);
    }
}

export default {
    getAll,
    getById,
    getAllByDate,
    create,
    update,
    remove,
};
