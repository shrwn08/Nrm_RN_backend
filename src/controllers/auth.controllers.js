import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    try{
        const {fullname, email, phone_no, company_name, city, password} = req.body;


        console.log(req.body);

        if(!fullname || !email || !phone_no || !company_name  || !city || !password ){
            return res.status(400).json({error: "Please enter all the required fields"});
        }

        if (!/^\d{10}$/.test(phone_no))
            return res.status(400).json({error: "Phone number should be 10 digits"});

        let isAvailable;
        if(phone_no && email ){
            isAvailable = await User.findOne({ $and: [{ email, phone_no }] });
        }
        if(isAvailable){
            return res.status(400).json({error: "Email or Phone number already exists"});
        }

        const user = new User({
             fullname,
            email,
            phone_no,
            company_name,
            city,
            password,
        });

        await user.save();
        console.log("Successfully registered!");
        return res.status(201).json({message: "Successfully registered"});

    }catch(err){
        res.status(500).json({message: "ServerSide Error: " + err.message});
    }
}