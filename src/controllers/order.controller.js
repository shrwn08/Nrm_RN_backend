import Order from "./models/Order";


//Post /api/orders

export const createOrder = async (req, res) => {
    try{
        const {party, rod_type, rodLines, truck, shippingAddress} = req.body;

        if(!party || !rod_type || !shippingAddress ){
            return res.status(400).json({
                message : "party, rod type and shipping Address are required"
            })
        }

        if(!Array.isArray(rodLines) && rodLines.length === 0){
            return res.status(400).json({
                message : "At least diameter/quantity line is required"
            })
        }

        const order = new Order({
            party,
            rod_type,
            rodLines,
            truck,
            shippingAddress,
            createdBy: req.user._id,

        });

        await order.save();

        return res.status(201).json({order, message: 'Order successfully'})
    }catch (e) {
        if(e.name === "ValidationError") {
            return res.status(400).json({message : e.message});
        }
        return res.status(500).json({message : "failed to create order", error : e.message});

    }
}