const { model, Schema } = require('mongoose')
const Users = new Schema({
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    referral_code: {
        type: String,
    }
})

const User = model('User', Users)
module.exports = User;