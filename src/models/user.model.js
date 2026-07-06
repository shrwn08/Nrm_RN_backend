import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone_no : {
        type: String,
        required: true,
        unique: true,
    },
    company_name: {
        type: String,
        required: true,
    },
    city : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps:true});



userSchema.pre('save', async function (next){
    try{
        if(!this.isModified("password"))return next();

        const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);
    }catch(e){
        next(e);
    }

})


userSchema.method.comparePassword = async function(password){
    try{
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    }catch(err){
        console.error("Error comparing password:",err);
    }
}

const User = mongoose.model("User", userSchema);

export default User;