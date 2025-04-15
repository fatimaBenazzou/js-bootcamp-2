import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });
        if (!user) throw new Error("User not found !");

        if (!(await bcrypt.compare(password, user.password)))
            throw new Error("Invalid credentials");

        const token = jwt.sign({ _id: user._id.toString() }, process.env.AUTH_SECRET, {
            expiresIn: 3600 * 24,
        });

        res.json({ user: user.toSimpleUser(), token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export async function registerUser(req, res) {
    try {
        const { email, password, firstName, lastName, role } = req.body;
        const user = await userModel.create({ email, password, firstName, lastName, role });

        const token = jwt.sign({ _id: user._id.toString() }, process.env.AUTH_SECRET, {
            expiresIn: 3600 * 24,
        });

        res.json({ user: user.toSimpleUser(), token: token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export function checkUser(req, res) {
    res.json({ data: req.user.toSimpleUser() });
}
