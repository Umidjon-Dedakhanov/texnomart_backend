const express = require("express");
const Joi = require("joi");
const CreateProductSchema = require("../../models/CreateProductSchema");

const newProduct = express.Router();

newProduct.post("/newProduct", async (req, res) => {
    const { image, info, price } = req.body;
    const validationSchema = Joi.object({
        image: Joi.string().min(3).required(),
        info:  Joi.string().min(3).max(1024).required(),
        price: Joi.string().min(3).max(1024).required(),
    })

    const validation = validationSchema.validate({ image, info, price });

    if(!validation.error){
        const validProductImage = validation.value.image;
        try{
            const hasSameProductRecords = await CreateProductSchema.findOne({image: validProductImage});
            if(!hasSameProductRecords){
                const createNewProduct = await CreateProductSchema.create({
                    image: validation.value.image,
                    info: validation.value.info,
                    price: validation.value.price,
                })
                res.status(201).json({
                    message: "Успешно добавлено!",
                    product: createNewProduct
                })
            }
            else{
                res.status(500).json({
                    message: "Этот продукт уже доступен!"
                })
            }  
        }
        catch(err){
            res.status(500).json({
                message: "Внутренняя Ошибка Сервера!"
            })
        }
    }
    else{
        res.status(400).json({
            message: "Пожалуйста, заполните всю информацию корректно!"
        })
    }
})

newProduct.get("/all", async (req, res) => {
    try{
        const allProducts = await CreateProductSchema.find({});
        res.status(200).json({
            message: "Успешно получено!",
            allProducts: allProducts
        })
    }
    catch(err){
        res.status(500).json({
            message: "Внутренняя Ошибка Сервера!"
        })
    }
})


module.exports = newProduct;