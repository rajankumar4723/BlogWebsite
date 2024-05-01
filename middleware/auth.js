// import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import User from "../Models/user.js";

export const isAuthenticated = async(req,res,next) => {
    const {token} =  req.cookies;
    // console.log(token);

    if(!token){
     return res.status(404).json({ //When user not available..
        success: false,
        message: 'Login First',
    });
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);//Decode data under find id
    req.user = await User.findById(decoded._id);//find id
    next();

}