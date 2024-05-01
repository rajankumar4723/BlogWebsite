import bcrypt from 'bcrypt';
import User from "../models/user.js";
import { sendCookie } from "../features.js";
import ErrorHandler from '../middleware/error.js';

export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user)
            return next(new ErrorHandler("User already exists", 400));

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({ name, email, password: hashedPassword });
        sendCookie(user, res, "Registered successfully", 201);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user)
            return next(new ErrorHandler("Invalid email or password", 404));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return next(new ErrorHandler("Invalid email or password", 400));

        sendCookie(user, res, `Welcome back ${user.name}`, 200);
    } catch (err) {
        next(err);
    }
};

export const getMyProfile = (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};