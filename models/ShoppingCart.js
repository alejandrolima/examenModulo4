const mongoose = require("mongoose");
const ShoppingCartSchema = new mongoose.Schema({
    invoiceNumber:{
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
        default: 0
    },
    invoiceNumber: {
        type: String,
        required: true
    },
    products: [
        {
            productId: String,
            quantity: Number,
            price: Number
        }
    ]

});
const ShoppingCartModel = mongoose.model("shoppingCarts", ShoppingCartSchema);
module.exports = ShoppingCartModel;