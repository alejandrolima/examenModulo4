const express = require("express");
const authRouter = express.Router();
const { login, signup } = require("../controllers/Auth");
authRouter
    .route("/login")
    .post(login);

authRouter
    .route("/register")
    .post(signup);

module.exports = authRouter;