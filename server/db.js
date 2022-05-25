const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/commondb')

const db = mongoose.connection
db.once('error', () => console.log('db connect error.'))
db.once('open', () => console.log('MongoDB Connect Success.'))

const userSchema = mongoose.Schema({
    username: String,
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

const Models = {
    user: mongoose.model("users", userSchema),
    room: mongoose.model('rooms', roomSchema)
}

module.exports = Models