"use strict"
const models = require('../db')
const router = require('express').Router()

var responseData = {}

//获取房间数据
router.get('/api/rooms', (req, res) => {
    //console.log(res)
    models.room.find({}, function (err, data) {
        if (err) {
            responseData.code = '0';
            responseData.message = err
        }
        res.json(data)

    })
})

//新增房间
router.post('/api/rooms/add', (req, res) => {
    let req_data = req.body
    //解析出房间级别与类型
    let level_type = req_data.room_level;
    req_data.room_type = level_type.split("=").pop();
    req_data.room_level = level_type.split("=").shift();
    //console.log(req_data)
    if (!req_data.room_number || !req_data.room_level || !req_data.room_price || !req_data.room_status || !req_data.room_type) {
        responseData.code = '1'
        responseData.message = '新增房间数据关键项不能为空，请检查。'
        res.json(responseData)
    }
    models.room.findOne({ room_number: req_data.room_number }, function (err, data) {
        if (err) {
            responseData.code = '0'
            responseData.message = '查询失败，请联系管理员。'
            res.json(responseData)
        } else if (data) {
            console.log(1212, req_data.room_number, data)
            //返回数据，说明数据库中已有同一房间号
            responseData.code = '5'
            responseData.message = '已有此房间号了，请重新输入。'
            res.json(responseData)
        } else {
            let newRoom = new models.room({
                room_number: req_data.room_number,
                room_level: req_data.room_level,
                room_price: req_data.room_price,
                room_status: req_data.room_status,
                room_type: req_data.room_type
            })
            newRoom.save((err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    responseData.code = '200'
                    responseData.message = '新增房间成功'
                    res.json(responseData)
                }
            })
        }
    })
})

module.exports = router