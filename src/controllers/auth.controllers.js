import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();




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


//login
export const login = async (req, res) => {
    try{
        const {email, phone_no, password}  = req.body

        const identifier = email || phone_no;

       if(!identifier || !password){
           return res.status(400).json({error: "Please enter all the required fields"});
       }

       const user = await User.findOne(email ? {email} : {phone_no});


       if(!user)
           return res.status(400).json({error: "User not found"});

       const isMatch = await user.comparePassword(password);

       if(!isMatch)
           return res.status(400).json({error: "Invalid Credentials"});

       const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: "30d"});

        return res.status(200).json({message : "Login successful",
            token: token,       
                                        user : {
                                             id: user._id,
                                            fullname : user.fullname,
                                            email : user.email,
                                            phone_no : user.phone_no,
                                        }});
    }
    catch(err){
        res.status(500).json({error: "ServerSide Error: " + err.message});
    }
}