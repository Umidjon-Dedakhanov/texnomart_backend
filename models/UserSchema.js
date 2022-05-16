const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    phonenumber: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    username: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    },
    fullname: {
        type: String,
        required: true,
        min: 5,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    }

})

module.exports = mongoose.model("Users", UserSchema)