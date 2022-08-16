"use strict"
const models = require('../db')
const router = require('express').Router()

var responseData = {}

//办理入住
router.post('/api/rooms/checkin', (req, res) => {
    let req_data = req.body
    console.log(req_data)
    //解析出房间级别与类型
    const { room_level, room_number, room_price, room_type, custom_ID, custom_name, custom_phone, comment } = req_data;

    //console.log(req_data)
    let room_id = req_data._id;
    //console.log(room_id, 4444)
    if (!room_id || !room_number || !room_price || !room_type || !custom_ID || !custom_name || !custom_phone) {
        responseData.code = '1'
        responseData.message = '新增房间数据关键项不能为空，请检查。'
        res.json(responseData)
    }

    const addCheckinRecord = new Promise((resolve, reject) => {
        models.checkin.findOne({}, function (err, data) {
            if (err) {
                responseData.code = '0'
                responseData.message = '查询失败，请联系管理员。'
                res.json(responseData)
            }
            let newCheckinRecord = new models.checkin({
                room_id,
                room_number,
                room_level,
                room_price,
                room_type,
                custom_ID,
                custom_name,
                custom_phone,
                comment
            })
            newCheckinRecord.save((err, data) => {
                if (err) {
                    //console.log(new Error(err))
                    reject(new Error(err))
                }
                resolve()
            })

        })
    })


    //根据房间 _id 查找并更新房间状态
    const updateRoomStatus = new Promise((resolve, reject) => {
        models.room.findOne({ room_id: req_data._id }, function (err, data) {
            if (err) {
                responseData.code = '0'
                responseData.message = '查询失败，请联系管理员。'
                reject(res.json(responseData))
            } else if (data) {
                //返回数据，则查找到数据库中的房间了

            }
        })

    })

    Promise.all([addCheckinRecord(), updateRoomStatus()]).then(res => {
        console.log('办理入住成功')
    }).catch(err => {
        return new Error(err)
    })
})

module.exports = router