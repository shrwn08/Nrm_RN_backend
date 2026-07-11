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


//Get /api/order?status=pending

export const getOrders = async (req, res) =>{
    try{
        const {status} = req.query;
        const filter = {createdBy : req.user._id};

        if(status){
            filter.status = status;
        }

        const orders = await Order.find(filter).sort({createdAt : -1});
        return res.status(200).json(orders);



    }catch (e) {
        return res.status(500).json({message : "Failed to fetch orders", error : e.message});
    }
}


//GET /api/orders/:id

export const getOrderById = async (req, res) => {
    try{
        const order = await Order.findOne({_id: req.params.id, createdBy : req.user._id});

        if(!order){
            return res.status(404).json({message : "order not found"})
        }
        return res.status(200).json(order);
    }catch (e) {
        return res.status(500).json({message : "Failed to fetch orders", error : e.message});
    }
}
