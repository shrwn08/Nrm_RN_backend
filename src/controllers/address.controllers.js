import Address from "../models/address.model.js"
import error from "jsonwebtoken/lib/JsonWebTokenError.js";

//post /api/addresses


export const createAddress = async (req, res) => {
    try{
        const {label, addressLine, city, district, state, pincode, party, isDefault} = req.body;

        if(!addressLine || !city || !district || !state || !pincode || !pincode){
            return res.status(400).json({
                message : "addressLine, city, district, state and pincode are required"
            });
        }

        if(isDefault){
            await Address.updateMany(
                {createdBy : req.user._id, isDefault: true},
                {isDefault : false}
            )
        }

        const address = await Address.create({
            label,
            addressLine,
            city,
            district,
            state,
            pincode,
            party,
            isDefault : Boolean(isDefault),
            createdBy : req.user._id,
        });

        return res.status(201).json({address : address, message : "success"});
    }catch(err){
        if(error.name === "ValidationError"){
            return res.status(400).json({message: error.message});
        }
        return res.status(400).json({message: "Failed to save address"});
    }
}