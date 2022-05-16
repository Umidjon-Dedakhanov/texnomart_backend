const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        max: 1024,
        min: 3
    },
    info: {
        type: String,
        required: true,
        max: 1024,
        min: 3
    },
    price: {
        type: String,
        required: true,
        max: 1024,
        min: 3
    }

})

module.exports = mongoose.model("Products", ProductSchema)