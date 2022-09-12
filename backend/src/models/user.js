const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const User = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Suspended'],
        default: 'Active'
    },
    role: {
        type: String,
        enum: ['Admin', 'Employee'],
        default: 'Employee'
    },
    refreshToken: String
}, { timestamps: true })

module.exports = mongoose.model('User', User);