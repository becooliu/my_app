"use strict"

const models = require("../db.js")
const express = require('express')
const router = express.Router()

var responseData = {}

//user login
router.post('/api/Admin/Login', (req, res) => {
    let req_data = req.body
    if (!req_data.username || !req_data.password) {
        responseData.code = '1'
        responseData.message = '用户名或密码不能为空。'
        res.json(responseData)
    }
    models.user.findOne({ username: req_data.username }, function (err, data) {
        if (err) {
            responseData.code = '0'
            responseData.message = '查询失败，请联系管理员。'
        } else if (data) {
            console.log(data)
            if (data.username == req_data.username && data.password == req_data.password) {
                responseData.code = '200'
                responseData.message = '登录成功。'
            } else {
                responseData.code = '3'
                responseData.message = '帐号或密码错误，请重试。'
            }
        } else {
            responseData.code = '4'
            responseData.message = '帐号不存在，请确认。'
        }
        //res.json(responseData)
    })

    res.json(responseData)
})

//user register
router.post('/api/user/Register', (req, res) => {
    let req_data = req.body
    if (!req_data.username || !req_data.password) {
        responseData.code = '1'
        responseData.message = '用户名或密码不能为空。'
        res.json(responseData)
    }
    models.user.findOne({ username: req_data.username }, function (err, data) {
        if (err) {
            responseData.code = '0'
            responseData.message = '查询失败，请联系管理员。'
        } else if (data) {
            //如返回了数据，说明数据库中已有此用户名了
            responseData.code = '5'
            responseData.message = '此帐号已有人注册了，请重新注册。'
            res.json(responseData)
        } else {
            //此帐号可以注册
            let newAccount = new models.user({
                username: req_data.username,
                password: req_data.password
            })
            newAccount.save((err, data) => {
                if (err) {
                    //数据插入失败
                    res.send(err)
                } else {
                    //数据插入成功
                    responseData.code = '200'
                    responseData.message = '帐号注册成功。'
                    res.json(responseData)
                }
            })
        }
    })

    //res.json(responseData)
})

//user reset
router.post('/api/user/Reset', (req, res) => {
    let req_data = req.body
    if (!req_data.username || !req_data.password) {
        responseData.code = '1'
        responseData.message = '用户名或密码不能为空。'
        res.json(responseData)
    }
    models.user.findOne({ username: req_data.username }, function (err, data) {
        if (err) {
            responseData.code = '0'
            responseData.message = '查询失败，请联系管理员。'
            res.json(responseData)
        }

        if (data) {
            //如返回了数据，说明有此用户名对应的信息，进一步判断旧密码是否匹配
            if (req_data.old_password == data.password) {
                let newPassword = new models.user({
                    username: req_data.username,
                    password: req_data.password
                })
                newPassword.save((err, data) => {
                    if (err) {
                        //数据插入失败
                        res.send(err)
                    } else {
                        //数据插入成功
                        responseData.code = '200'
                        responseData.message = '密码修改成功。'
                        res.json(responseData)
                    }
                })
            } else {
                responseData.code = '5'
                responseData.message = '旧密码不正确，请重试。'
                res.json(responseData)

            }
        } else {
            responseData.code = '4'
            responseData.message = '没有查询到此用户，请重试。'
            res.json(responseData)
        }
    })

    //res.json(responseData)
})

module.exports = router