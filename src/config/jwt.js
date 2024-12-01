import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

function sign(data, expiresIn = "1h") {
    const token = jwt.sign(data, SECRET, {
        expiresIn,
    });
    return token;
}

function verify(token) {
    console.log("Token", token);
    try {
        const response = jwt.verify(token, SECRET);
        return response;
    } catch (error) {
        console.error(error);
        return { error: "Can't verify token", status: 500 };
    }
}

function getTokenPayload(req) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        throw new Error("JWT token needed");
    }
    const token = authorization.replace("Bearer ", "");
    const verified = verify(token);
    if (verified.error) {
        throw new Error("Invalid token");
    }
    return verified;
}

export default {
    sign,
    verify,
    getTokenPayload,
};
