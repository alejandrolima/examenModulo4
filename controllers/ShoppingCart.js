const { response } = require("../app");
const ShoppingCart = require("../models/ShoppingCart");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

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

    let shoppingCarts = new ShoppingCart();
    shoppingCarts = await ShoppingCart.find({status: 'PENDING'});

    if(shoppingCarts.length > 0) {
        if(shoppingCarts[0].products.length>0) {
            shoppingCarts[0].status = 'PAID';
            
            shoppingCarts[0].save();
            res.status(200).json({
                status: "ok",
                mensaje:'El pago fue exitoso'
            });
        } else {
            res.status(500).json({
                status: "error",
                mensaje:`No se encontraron registrados productos en el carrito`
            });
        }
    } else {
        res.status(500).json({
            status: "error",
            mensaje:`No se encontro un carrito con estado pendiente`
        });
    }

});

const  addProductShoppingCart = catchAsync(async (req, res) => {
    // primero verificar si tiene un carrito el usuario PENDING
    token = req.headers.authorization;
    const { email } = jwt.verify( token, process.env.JWT_SECRET );
    
    let newShoppingCart = new ShoppingCart();
    let dataShoppingCart = await ShoppingCart.find({user: email, status: 'PENDING'});
    
    if (dataShoppingCart.length==0) {
        // crear el carrito
            let shoppingCart = new ShoppingCart;  
            shoppingCart.status  = "PENDING";
            shoppingCart.totalAmount =0;
            shoppingCart.user = email;
            let numero = Math.floor(Math.random() * 1000) + 1
            shoppingCart.invoiceNumber = numero.toString;
            console.log("Se ha creado un Carrito");
            dataShoppingCart.push(shoppingCart);

    }
    // adicionamos el producto al carrito
    newShoppingCart= dataShoppingCart[0];
    let producto = {productId: req.body.productId, quantity: req.body.quantity, price: req.body.price};
    newShoppingCart.products.push(producto);
    newShoppingCart.totalAmount += (producto.quantity*producto.price);
    newShoppingCart = await newShoppingCart.save();
    res.status(200).json({
        status: "ok",
        dataInserted: newShoppingCart
    });
});

const deleteShoppingCart = catchAsync(async (req, res) => {

    let shoppingCarts = new ShoppingCart();
    shoppingCarts = await ShoppingCart.find({status: 'PENDING'});
    
    if(shoppingCarts.length > 0) {

        let valor = shoppingCarts[0].products.filter((producto) => producto.productId !== req.params.id);
        console.log('valorrrrrr:', valor);

        if(valor) {
            if(shoppingCarts[0].products.length>1) {
                shoppingCarts[0].products = shoppingCarts[0].products.filter((producto) => producto.productId == req.params.id );
                shoppingCarts[0].save();
            } else {
                shoppingCarts[0].products.shift();
                shoppingCarts[0].save();
            }

            res.status(200).json({
                status: "ok",
                mensaje: "Eliminado correctamente"
            });
        } else {
            res.status(500).json({
                status: "error",
                mensaje:`No se encontro un registro con el id: ${req.params.id}`
            });
        }
    } else {
        res.status(200).json({
            status: "ok",
            mensaje: "No se encontro con status pendiente"
        });
    }
})

module.exports = {
    addShoppingCart,
    payShoppingCart,
    deleteShoppingCart,
    addProductShoppingCart
}

