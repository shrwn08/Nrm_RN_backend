import User from "../models/user.model.js";
import crypto from "crypto";


//Get /api/me

export const getMe = async (req, res) => {
    try{
        return res.status(200).json({user: req.user});
    }catch(e){
        return res.status(400).json({message:"ServerSide error"+ e.message});
    }
}


//Patch /api/me
export const updateProfile = async (req, res) => {
    try{
        const {fullname, city} = req.body;
        console.log(req.body)

        const user = await  User.findById(req.user._id);

        if(fullname !== undefined ) user.fullname = fullname;
        if(city !== undefined ) user.city = city;

        await user.save();

        return res.status(200).json({message:"Profile saved",
        user : {
         id : user._id,
         fullname : fullname,
         email : user.email,
         phone_no : user.phone_no,
         company_name : user.company_name,
         city : city,
        },
        });

    }
    catch(e){
        if(e.name === "ValidationError"){
            return res.status(400).json({message:"ServerSide error"+ e.message});
        }
        return res.status(500).json({message:"ServerSide error"+ e.message});
    }
}


//patch /api/change-password

export const changePassword = async (req, res) => {
    try{
        const {currentPassword, newPassword} = req.body;

        if(!currentPassword || !newPassword){
            return res.status(400).json({message:"Please enter your current and new password"});
        }

        if(newPassword.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const user = await User.findById(req.user._id);

        const isMatch = await user.comparePassword(currentPassword);

        if(!isMatch){
            return res.status(200).json({message : "Current password is incorrect"});
        }

        user.password = newPassword;
        await user.save();
        return res.status(200).json({message: "Password changed successfully"});
    }catch(e){
        return res.status(500).json({message:"ServerSide error"+ e.message});
    }
}

//Post /api/forget-password

export const forgetPassword = async (req, res) => {
    try{
        const {email, phone_no} = req.body;

        if(!email || !phone_no){
            return res.status(400).json({message:"Please enter your email address or phone number"});
        }

        const user = await User.findOne({$or : [...(email ? [{email}] :[]), ...(phone_no ? [{phone_no}] : [])]});

        const genericResponse = {
            message : "If an account exist, a reset code has been sent."
        }

        if(!user){
            return  res.status(200).json(genericResponse)
        }

        const code = crypto.randonInt(100000, 999999).toString();

        user.resetPasswordToken =code;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; //15'

        await  user.save();

        console.log(`[forgetPassword ] reset code for ${user.email} : ${code}`);

        return res.status(200).json({...genericResponse, ...(process.env.NODE_ENV !== "production" ? {devResetCode : code} : {})})

    }catch(e){
        return res.status(500).json({message : "ServerSide error"+ e.message});
    }
}

//POST /api/reset-password

export const resetPassword = async (req, res) => {
    try{
        const {email, phone_no, code, newPassword} = req.body;

        if((!email && !phone_no) || !code || !newPassword){
            return res.status(400).json({message:"please enter all the required fields"});
        }

        if(newPassword.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const user = await User.findOne({
            $or: [...(email ? [{email}] :[]), ...(phone_no ? [{phone_no}] : [])]
        }).select("+resetPasswordToken +resetPasswordExpires");

        if(!user || !user.resetPasswordToken || user.resetPasswordToken !== code){
            return res.status(400).json({message : "Invalid or expired reset code"});
        }

        if(!user.resetPasswordExpires || user.resetPasswordExpires.getTime() < Date.now()){
            return res.status(400).json({ message: "Reset code has expired, please request a new one" });
        }

        user.password = newPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully, please log in" });

    }catch (e) {
        return res.status(500).json({message:"ServerSide error"+ e.message});
    }
}