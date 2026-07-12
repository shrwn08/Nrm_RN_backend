const cache = new Map();
const CACHE_TTL_MS= 24 * 60 * 60 * 1000; //24hrs

//Get /api/pincode/:pincode

export const lookupPincode = async (req, res) => {
    const { pincode } = req.params;

    if(!/^[1-9][0-9]{5}$/.test(pincode)){
        return res.status(404).json({message : 'Enter a valid 6-digit pincode'});
    }

    const cached = cache.get(pincode);

    if(cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
        return res.status(404).json(cached.data);
    }

    try{
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        const result = data?.[0];

        if(result?.status !== "success" || !result.PostOffice?.length){
            return res.status(404).json({message : "No address found for this pincode"});
        }

        const postOffice = result.PostOffice[0];
        const normalized = {
            city : postOffice.Name || "",
            district : postOffice.District || "",
            state : postOffice.State || "",
        };

        cache.set(pincode, {data : normalized, fetchedAt : Date.now()});

        return res.status(200).json(normalized);
    }catch(err){
        return res.status(502).json({message : "Could not reach pincode lookup service"})
    }
}