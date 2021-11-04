const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/commondb')

const db = mongoose.connection
db.once('error', () => console.log('db connect error.'))
db.once('open', () => console.log('MongoDB Connect Success.'))

const userSchema = mongoose.Schema({
    username: String,
    password: String
})

const Models = {
    user: mongoose.model("users", userSchema)
}

module.exports = Models