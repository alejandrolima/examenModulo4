const express = require("express");
const productRouter = express.Router();
const { getAllProducts, addProduct, deleteProduct,getProductById ,updateProduct} = require("../controllers/Product")
const {protect } = require("../controllers/Auth");
//producs
productRouter
    .route("/")
    .all(protect)
    .get(getAllProducts)
    .post(addProduct);
    
productRouter
    .route("/:id")
    .all(protect)
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = productRouter;