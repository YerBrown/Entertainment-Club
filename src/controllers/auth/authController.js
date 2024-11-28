import usersController from "../users/usersController.js";
import { verifyPassword } from "../../config/bcrypt.js";
import error from "../../helpers/errors.js";

async function register(username, email, password, passwordConfirm) {
    if (password != passwordConfirm) {
        throw new error.PASSWORD_NOT_MATCH();
    }
    const oldUser = await usersController.getByEmail(email);
    if (oldUser) {
        throw new error.EMAIL_ALREADY_EXISTS();
    }
    const newUser = await usersController.create(username, email, password);
    return newUser;
}

async function login(email, password) {
    const user = await usersController.getByEmail(email);
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    const verified = await verifyPassword(password, user.password);
    if (!verified) {
        throw new error.INVALID_CREDENTIALS();
    }
    return user;
}

export default {
    register,
    login,
};
