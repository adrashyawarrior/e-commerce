const mongoose = require('mongoose')
const validator = require('validator')
const USER_ROLES = require('../references/arrays/USER_ROLES.json')
const USER_STATUSES = require('../references/arrays/USER_STATUSES.json')

const Schema = mongoose.Schema;

const User = Schema({
    name: {
        type: String,
        required: true,
        validate: (value) => { return value.length > 0 }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    password: {
        type: String,
        required: true,
        validate: (value) => { return value.length > 0 }
    },
    status: {
        type: String,
        enum: USER_STATUSES,
        default: USER_STATUSES[0],
        validate: (value) => { return value.length > 0 }
    },
    role: {
        type: String,
        enum: USER_ROLES,
        default: USER_ROLES[0],
        validate: (value) => { return value.length > 0 }
    },
    refreshToken: String
}, { timestamps: true })

module.exports = mongoose.model('User', User);