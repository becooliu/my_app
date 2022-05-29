"use strict"
const models = require('../db')
const router = require('express').Router()

var responseData = {}

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

module.exports = router