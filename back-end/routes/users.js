const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const moment = require('moment');

// Rota para cadastro de usuário
router.post('/register', async (req, res) => {
    const { name, email, password, birthdate} = req.body;

    if (!name) {
        return res.status(400).json({ msg: 'O nome é obrigatório.' });
    }
    if (!email) {
        return res.status(400).json({ msg: 'O email é obrigatório.' });
    }
    if (!password) {
        return res.status(400).json({ msg: 'A senha é obrigatória.' });
    }
    if (!birthdate) {
        return res.status(400).json({ msg: 'A data de nascimento é obrigatória.' });
    }

    const age = moment().diff(birthdate, 'years');
    if (age < 18) {
        return res.status(400).json({ msg: 'Você deve ter pelo menos 18 anos de idade.' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10), // Hash da senha
            birthdate
        });

        await user.save();
        res.status(201).json({ msg: 'Usuário cadastrado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});


module.exports = router;