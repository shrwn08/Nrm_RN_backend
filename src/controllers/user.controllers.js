import User from "./src/models/USer";
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

        const isMatch = await user.comparePassword(newPassword);

        if(!isMatch){
            return res.status(200).json({message : "Current password is incorrect"});
        }

        user.password = newPassword;
        await user.save();
    }catch(e){
        return res.status(500).json({message:"ServerSide error"+ e.message});
    }
}