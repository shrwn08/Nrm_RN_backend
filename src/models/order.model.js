import mongoose from "mongoose";



const rodLineSchema = new mongoose.Schema({
    diameter : {
        type : String,
        required : true,
        enum : ["8mm", "12mm", "16mm", "20mm", "24mm"],
    },
    quantity  {
        type : Number,
        required : true,
        min : [0.1, "Quantity must be greater than 0."],
    }
},{
    _id: false
})

const orderSchema = new mongoose.Schema(
    {
        party : {
            type : String,
            required : [true, "Party name is required"],
            trim : true
        },
        rod_type : {
            type : String,
            required : [true, "Company name is required"],
            enum : ["Jindal" , "Rathi"]
        },
        rodLines : {
            type : [rodLineSchema],
            required : true,
            validate : {
                validator : (lines) => Array.isArray(lines) && lines.length > 0
},              message : "At least one diameter & quantity line is required"

        },
        truck : {
            number: {
                type: "String",
                required: true,
                trim: true,
                uppercase: true,
            },
            driveInfo: {
                type: String,
                trim: true,
            }
        },
        shippingAddress :  {
            type: String,
            enum : ["pending", "confirmed", "dispatched", "delivered", "canceled"],
            default: "pending",
        },
        createdBy : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true
        }

    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;