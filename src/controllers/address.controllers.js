import Address from "../models/address.model.js"

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


//Get /api/addresses
 export const getAddress = async (req, res) => {
    try{
        const addresses = await Address.find({createdBy : req.user._id}).sort({
            isDefault : -1,
            createdAt : -1,
        });

        return res.status(200).json({address : addresses});

    }catch(err){
        return res.status(500).json({message : " Failed to fetch addresses"})
    }
 }

 //Delete /api/addresses/:id
export const deleteAddress = async (req, res) => {
    try{
        const address = await Address.findOneAndDelete({
            _id : req.params.id,
            createdBy : req.user._id
        });

        if(!address){
            return res.status(404).json({message : "Address does not exist"});
        }

        return res.status(200).json({message : "Address deleted successfully"});
    }catch(err){
        return res.status(500).json({message : "Failed to delete address"});
    }
}