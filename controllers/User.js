const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find();
    
    res.status(200).json({
        status: "ok",
        data: users,
    });
});
const getUserById = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({
        status: "ok",
        data: user,
    });
});

const addUser = catchAsync(async (req, res) => {
    let newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser = await newUser.save();
    res.status(200).json({
        status: "ok",
        dataInserted: newUser,
    });
});
const updateUser = catchAsync(async (req, res) => {
    let updateUser = await User.findById(req.params.id);
    updateUser.email = req.body.email;
    updateUser.password = req.body.password;
    updateUser.firstName = req.body.firstName;
    updateUser.lastName = req.body.lastName;
    updateUser = await updateUser.save();
    res.status(200).json({
        status: "ok",
        dataUpdate: updateUser,
        mensaje: "Actualizado Correctamente"
    });
});

const deleteUser = catchAsync(async (req, res) => {

    const user = await User.findById(req.params.id);
    
    await User.remove(user);
    res.status(200).json({
        status: "ok",
        mensaje: "Eliminado correctamente"
    });
})

module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    deleteUser,
    updateUser
}

