const express = require("express");
const userRouter = express.Router();
const { getAllUsers, addUser, deleteUser,getUserById,updateUser } = require("../controllers/User")

//users
userRouter
    .route("/")
    .get(getAllUsers)
    .post(addUser);
    
userRouter
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

module.exports = userRouter;