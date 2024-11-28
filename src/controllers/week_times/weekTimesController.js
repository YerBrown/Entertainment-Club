import sequelize from "../../config/sequelize.js";
import { Op } from "sequelize";
import WeekTime from "../..//models/weekTimeModel.js";
import errors from "../../helpers/errors.js";

async function getAll() {
    const weekTimes = await WeekTime.findAll();
    return weekTimes;
}
async function getById(id) {
    const weekTime = await WeekTime.findByPk(id);
    return weekTime;
}
async function getAllByDate(date) {
    const weekDay = new Date(date).getDay();
    const weekTimes = await WeekTime.findAll({
        where: {
            week_day: weekDay,
        },
    });
    if (weekTimes.length === 0) {
        throw new errors.WEEK_TIME_NOT_FOUND();
    }
    return weekTimes;
}
async function create(week_day, time) {
    const weekTime = await WeekTime.create({ week_day, time });
    return weekTime;
}
async function update(id, week_day, time) {
    const weekTime = await WeekTime.findByPk(id);
    if (!weekTime) {
        throw new errors.WEEK_TIME_NOT_FOUND();
    }

    await weekTime.update({ week_day, time });
    return weekTime;
}
async function remove(id) {
    const weekTime = await WeekTime.findByPk(id);
    if (!weekTime) {
        throw new errors.WEEK_TIME_NOT_FOUND();
    }

    await weekTime.destroy();
    return weekTime;
}
export default {
    getAll,
    getById,
    getAllByDate,
    create,
    update,
    remove,
};
