const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'An email is required'],
        unique: [true, 'An email must be unique']
    },
    name: {
        type: String,
        required: [true, 'A name is required']
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
        select: false
    },
    addresses: [{
        street1: {
            type: String,
            required: [true, 'An address requires a street 1']
        },
        street2: {
            type: String
        },
        city: {
            type: String,
            required: [true, 'An address requires a city']
        },
        state: {
            type: String,
            required: [true, 'An address requires a state']
        }
    }],
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;