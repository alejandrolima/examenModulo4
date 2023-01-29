const express = require("express");
const shoppingCartRouter = express.Router();
const { addShoppingCart, payShoppingCart, deleteShoppingCart, addProductShoppingCart} = require("../controllers/ShoppingCart")
const {protect } = require("../controllers/Auth");
//shopping cart
shoppingCartRouter
    .route("/product")
    .all(protect)
    .post(addProductShoppingCart);

shoppingCartRouter
    .route("/product/:id")
    .all(protect)
    .delete(deleteShoppingCart);

shoppingCartRouter
    .route("/pay")
    .all(protect)
    .post(payShoppingCart);
    

module.exports = shoppingCartRouter;