
const mongoose = require("mongoose");
const app = require("./app")


process.on("uncaughException", (err) => {
    console.log("uncaughException", err);
    console.log("shutting down");
    process.exit(1);
});

mongoose.set('strictQuery', false);

// MONGOOSE CONNECTION
mongoose.connect(process.env.DB_URL, {}).then(async (con) => {
    console.log("connected to mongo");
    //sincronize=true;

}).catch((err) => {
    console.log(err);
});


const server = app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
    console.log("unhandledRejection", err);
    console.log("shutting down");
    server.close(() => {
        process.exit(1)
    });
});