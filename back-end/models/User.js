const mongoose = require('mongoose');
const moment = require('moment'); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                const age = moment().diff(value, 'years');
                return age >= 18;
            },
            message: 'Você deve ter pelo menos 18 anos de idade.'
        }
    }
});

module.exports = mongoose.model('User', userSchema);
