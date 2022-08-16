const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/commondb')

const db = mongoose.connection
db.once('error', () => console.log('db connect error.'))
db.once('open', () => console.log('MongoDB Connect Success.'))

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: [3, '名字长度不能小于3'],  //字符串最小长度
        trim: true //去除字符串2边的空格
    },
    password: String,
    password2: String
})

const roomSchema = mongoose.Schema({
    room_number: Number,
    room_level: String,
    room_type: String,
    room_price: Number,
    room_status: Number
})

const checkinSchema = mongoose.Schema({
    room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'room'
    },
    room_number: {
        type: Number
    },
    room_price: {
        type: Number,
        validator: value => {
            return value && Number(value)
        }
    },
    room_type: String,
    custom_ID: String,
    custom_name: String,
    custom_phone: String,
    data_in: String,
    date_out: String,
    comment: String
}, { timestamps: { createAt: 'created', updateAt: 'updated' } })

const Models = {
    user: mongoose.model("users", userSchema),
    room: mongoose.model('rooms', roomSchema),
    checkin: mongoose.model('checkin', checkinSchema)
}

module.exports = Models