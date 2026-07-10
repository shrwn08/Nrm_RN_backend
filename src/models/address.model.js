import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    label : {
        type: String,
        trim: true,
    },
    addressLine : {
        type : String,
        required : [true, "Address is required"],
        trim: true,
    },
    city : {
        type : String,
        required : [true, "City is required"],
        trim: true,
    },
    district: {
        type : String,
        required : [true, "District is required"],
        trim: true,
    },
    state : {
        type : String,
        required : [true, "State is required"],
        trim: true,
        validate : {
            validator : value => /^[1-9][0-9]{5}$/.test(value),
            message : "Please enter a valid 6-digit pincode"
        }
    },
    party : {

        type : String,
        trim: true,
    },
    isDefault : {
        type : Boolean,
        default: false
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: [true, "Please enter all the required fields"],
    }

}, {timestamps: true});

const Address = mongoose.model("Address", addressSchema);
export default Address;