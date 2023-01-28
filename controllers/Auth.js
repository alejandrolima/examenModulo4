const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");

const login = catchAsync(async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email });
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")
    if (!user || user.password !== hashedPassword) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user._id, email, firstName: user.firstName, lastName: user.lastName },
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    const cookieOptions = {
        expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    res.cookie("jwt", token, cookieOptions)

    res.status(200).json({
        status: "ok",
        token,
    });
});

const signup = catchAsync(async (req, res) => {
    let { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
        throw new Error("Please provide complete information");
    }
    const user = new User();
    user.email = email;
    user.password = crypto.createHash("sha256").update(password).digest("hex");
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();

    res.status(200).json({
        status: "ok",
        message: "User created",
    });
});

const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization;
    } else {
        throw new Error("Please login");
    }
    const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

    console.log(decoded);
    req.user = decoded;
    next();
    
});





module.exports = {
    login,
    signup,
    protect
}

