const UserAddress = require('../models/address');

exports.addAddress = (req,res) => {
    const { payload } = req.body;
    if(payload.address){
        if(payload.address._id){
            UserAddress.findOneAndUpdate(
                { user: req.user._id, "address._id": payload.address._id }, 
                {
                    $set: {
                        "address.$": payload.address
                    },
                }
            ).exec((error, address) => {
                if(error) return res.status(400).json({ error });
                if(address){
                    res.status(200).json({ address });
                }
            }); 
        }else{
            UserAddress.findOneAndUpdate(
                { user: req.user._id }, 
                {
                    $push: {
                        address: payload.address
                    },
                },
                { new: true, upset: true }
            ).exec((error, address) => {
                if(error) return res.status(400).json({ error });
                if(address){
                    res.status(200).json({ address });
                }
            });
        }
        
    }else{
        res.status(400).json({ error: 'params address required'});
    }
}

exports.getAddress = (req, res) => {
    UserAddress.findOne({ user: req.user._id })
    .exec((error, userAddress) => {
        if(error) return res.status(400).json({ error });
        if(userAddress){
            res.status(200).json({ userAddress });
        }
    }) ;
}