const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");
const newUser = require("./routes/new-user/newUser")
const loginUser = require("./routes/auth/login-user")
const newProduct = require("./routes/create-product/new-product")

const app = express();

const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_DB_CONNECTION, () => {
    console.log("Connected to MONGO DB");
})

app.use("/", newUser)
app.use("/", loginUser)
app.use("/", newProduct)


app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})