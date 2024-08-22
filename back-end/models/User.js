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
                // Calcular a idade com base na data de nascimento
                const age = moment().diff(value, 'years');
                return age >= 18; // Retorna true se a idade for 18 ou mais
            },
            message: 'Você deve ter pelo menos 18 anos de idade.'
        }
    }
});

module.exports = mongoose.model('User', userSchema);
