const express = require('express')
const app = express()

const userApi = require('./api/user_api')
const roomApi = require('./api/room_api')
const checkinApi = require('./api/checkin_api')

const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(userApi).use(roomApi).use(checkinApi)

//允许跨域访问
app.use("*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
        res.send(200)
    } else {
        next()
    }
});

app.listen(8083);
console.log('success listen port: 8083......');