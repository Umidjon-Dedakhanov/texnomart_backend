const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const UserSchema = require("../../models/UserSchema");

const newUser = express.Router();

newUser.post("/newUser", async (req, res) => {
    const { phonenumber, username, fullname, password} = req.body;
    const validationSchema = Joi.object({
        phonenumber: Joi.string().min(5).max(1024).required(),
        username:  Joi.string().min(3).max(1024).required(),
        fullname: Joi.string().min(5).max(1024).required(),
        password:  Joi.string().min(8).max(1024).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).alphanum().required(),
    })

    const validation = validationSchema.validate({ phonenumber, username, fullname, password });

    if(!validation.error){
        const validUsername = validation.value.username;
        try{
            const saltRounds = 10;
            const hasSameUserRecords = await UserSchema.findOne({username: validUsername});
            if(!hasSameUserRecords){
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(validation.value.password, salt, async function(err, hash) {
                        if(!err){
                            const createNewUser = await UserSchema.create({
                                phonenumber: validation.value.phonenumber,
                                username: validation.value.username,
                                fullname: validation.value.fullname,
                                password: hash,
                            })
                            res.status(201).json({
                                message: "Успешно добавлено!",
                                user: createNewUser
                            })
                        }
                        else{
                            res.status(500).json({
                                message: "Внутренняя Ошибка Сервера!"
                            })
                        }
                    });
                });
            }
            else{
                res.status(409).json({
                    message: "Такое имя пользователя уже существует!",
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


module.exports = newUser;