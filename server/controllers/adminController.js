

const AdminDb = require("../models/adminModel");
const { comparePassword } = require("../Utilities/passwordUtilities");
const { createToken } = require("../Utilities/generateToken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const admin = await AdminDb.findOne({
            email: email.trim().toLowerCase(),
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const passwordMatch = await comparePassword(
            password,
            admin.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = createToken(admin._id.toString(), "admin");

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            message: "Admin login successful",
        });
    } catch (error) {
        console.error("Admin login error:", error.message);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

module.exports = { login };