import USer from "./src/models/USer";
import crypto from "crypto";


//Get /api/me

export const getMe = async (req, res) => {
    try{
        return res.status(200).json({user: req.user});
    }catch(e){
        return res.status(400).json({message:"ServerSide error"+ e.message});
    }
}