
const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createToken = (id, role = "user") => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error(
            "JWT_SECRET is missing. Please check your .env file."
        );
    }

    const token = jwt.sign(
        {
            id: id,
            role: role
        },
        secret,
        {
            expiresIn: maxAge
        }
    );

    return token;
};

module.exports = {
    createToken
};

