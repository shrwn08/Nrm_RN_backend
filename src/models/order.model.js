import mongoose from "mongoose";



const rodLineSchema = new mongoose.Schema({
    diameter : {
        type : String,
        required : true,
        enum : ["8mm", "12mm", "16mm", "20mm", "24mm"],
    },
    quantity : {
        type : Number,
        required : true,
        min : [0.1, "Quantity must be greater than 0."],
    }
},{
    _id: false
});

const shippingAdreesSnapshotSchema = new mongoose.Schema({
    addressLine : {
        type : String,
        required : true,
        trim : true,
    },
    city : {
        type : String,
        required : [true, "City is required"],
        trim: true,
    },
    district : {
        type : String,
        required : [ true, "District is required"],
        trim: true,
    },
    state : {
        type : String,
        required : [ true, "State is required"],
        trim: true,
    },
    pincode : {
        type : String,
        required : [ true, "Pincode is required"],
        trim: true,
        validate : {
            validator : value => /^[0-9][0-9]{5}$/.test(value),
            message : "enter a valid 6- digit pincode"
        }
    }
},{id : false });

const orderSchema = new mongoose.Schema(
    {
        party : {
            type : String,
            required : [true, "Party name is required"],
            trim : true
        },
        rodType : {
            type : String,
            required : [true, "Rod type is required"],
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
            required : [true , "Shipping address is required"],
        },
        status : {
            type : String,
            enum : ["pending", "confirmed", "dispatched", "delivered", "cancelled"],
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