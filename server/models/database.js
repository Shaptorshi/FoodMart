const mongoose = require('mongoose')

const mainSchema = new mongoose.Schema({
    userid: {
        type: [String],
        description: '',
        required: true
    },
    password: {
        type: [String],
        description: '',
        required: true
    },
    email: {
        type: [String],

        required: true,
        description: '',
    },
    location: {
        type: [String],
        required: true
    },
    date: {
        type: Date,

        default: Date.now()
    }
})
module.exports = mongoose.model('newUsers', mainSchema)