const { response } = require("../app");
const ShoppingCart = require("../models/ShoppingCart");
const catchAsync = require("../utils/catchAsync");

const addShoppingCart = catchAsync(async (req, res) => {
    let newShoppingCart = new ShoppingCart();
    newShoppingCart.name = req.body.name;
    newShoppingCart.price = req.body.price;
    newShoppingCart.unit = req.body.unit;
    newShoppingCart.inventory = req.body.inventory;
    newShoppingCart = await newShoppingCart.save();
    res.status(200).json({
        status: "ok",
        dataInserted: newShoppingCart,
        mensaje: "Producto agregado a carro de compras"
    });
});
const payShoppingCart = catchAsync(async (req, res) => {
    let newShoppingCart = new ShoppingCart();
    newShoppingCart.name = req.body.name;
    newShoppingCart.price = req.body.price;
    newShoppingCart.unit = req.body.unit;
    newShoppingCart.inventory = req.body.inventory;
    newShoppingCart = await newShoppingCart.save();
    res.status(200).json({
        status: "ok",
        dataInserted: newShoppingCart,
        mensaje: "Carro de compras pagado"
    });
});

const  addProductShoppingCart = catchAsync(async (req, res) => {
    // primero verificar si tiene un carrito el usuario PENDING
    const newShoppingCart = await newShoppingCart.findByOne({user:req.params.name, status: "PENDING" });
    if (newShoppingCart == null) {
        // crear el carrito
        let newShoppingCart = new ShoppingCart();
            newShoppingCart.status  = "PENDING";
            newShoppingCart.totalAmount =0;
            newShoppingCart.user = req.params.name;
            newShoppingCart.invoiceNumber = req.params.invoiceNumber;
    }
    // adicionamos el producto al carrito
});

const deleteShoppingCart = catchAsync(async (req, res) => {

    const ShoppingCarts = await ShoppingCart.findById(req.params.id);
    
    await ShoppingCart.remove(ShoppingCarts);
    res.status(200).json({
        status: "ok",
        mensaje: "Eliminado correctamente"
    });
})

module.exports = {
    addShoppingCart,
    payShoppingCart,
    deleteShoppingCart,
    addProductShoppingCart
}

