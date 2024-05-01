import bcrypt from 'bcrypt';
import User from "../models/user.js";
import { sendCookie } from "../features.js";
import ErrorHandler from '../middleware/error.js';

export const register = async (req, res, next) => {

    const { name, email, password } = req.body;
    let user = await User.findOne({ email });//One Time Can One User Register! Same User not register second time
    if (user) return next(new ErrorHandler("User Already Exist", 400));


    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(user, res, "Register Successfully", 201);

    // console.log(name, email, password);

}
export const login = async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user)
        return res.status(404).json({
            success: false,
            message: "Invaild Email or Password",
        });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
        return next(new ErrorHandler("Invalid Email or Password", 400));

    sendCookie(user, res, `Welcome back ${user.name}`, 200);
}

export const getMyProfile = (req, res) => {
   return res.status(200).json({
      success: true,
      user: req.user,
    });
  };

export const logout = (req, res) => {
    res.status(200);
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        //   sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        //   secure: process.env.NODE_ENV === "development" ? false : true,
    });

    res.status(200).json({
        success: true,
        user: req.user,
    });
}





