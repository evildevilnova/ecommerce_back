const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref:'user' },
    cartItems:[
        {
        product: {type: mongoose.Schema.Types.ObjectId, ref:'Product' },
        quantity: { type: Number, default: 1, required: true },
        // price:{ type: Number, required: true} , required: true
        }
    ]
},{timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
    