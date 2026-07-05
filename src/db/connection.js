import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


export async function connectDb (){
    try{
         await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    }catch(e){
        console.error("Failed to connect database",e.message );
    }
}

