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
        lowercase: true,
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
    },
    resetPasswordToken: {
        type: String,
        select : false
    },
    resetPasswordExpires : {
        type: Date,
        select: false
    }
},{timestamps:true});



userSchema.pre('save', async function (){

        if(!this.isModified("password")) return;

        const salt = await bcrypt.genSalt(10);
       this.password = await bcrypt.hash(this.password, salt);


})


userSchema.methods.comparePassword = async function(password){
    try{
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    }catch(err){
        console.error("Error comparing password:",err);
    }
}

const User = mongoose.model("User", userSchema);

export default User;