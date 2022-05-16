const express = require("express");
const Joi = require("joi");
const UserSchema = require("../../models/UserSchema");
const bcrypt = require("bcrypt");
const loginUser = express.Router();

loginUser.post("/loginUser", async (req, res) => {
    const { username, password } = req.body;
    const validationSchema = Joi.object({
        username:  Joi.string().min(6).max(1024).required(),
        password:  Joi.string().min(8).max(1024).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).alphanum().required(),
    })

    const validation = validationSchema.validate({username, password});

    if(!validation.error){
        const validusername = validation.value.username;
        const hasSameUserRecords = await UserSchema.findOne({username: validusername});
        if(hasSameUserRecords){
            bcrypt.compare(validation.value.password, hasSameUserRecords.password, (err, result) => {
                if(result){
                    res.status(200).json({
                        message: "Успешно вошли в систему!",
                        user: hasSameUserRecords
                    })
                }
                else{
                    res.status(401).json({
                        message: "Ошибка логина или пароля!"
                    })
                }
            })
        }
        else{
            res.status(404).json({
                message: "Нет такого пользователя!"
            })
        }
    }
    else{
        res.status(400).json({
            message: "Пожалуйста, заполните всю информацию корректно!"
        })
    }
})

module.exports = loginUser;