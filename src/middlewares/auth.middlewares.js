import jwt from 'jsonwebtoken';
import User from './models/user.model .js';
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ")? authHeader.split(" ")[1] : null;

        if (!token) {
            return res.status(401).json({message: "Not authorized, no token provided"});

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if(user){
            return res.status(401).json({message: "Not authorized, User not found."});

        }

        req.user = user;
        next();
    }catch (e) {
        return res.status(401).json({message: "Not authorized, No token provided"});
    }
}