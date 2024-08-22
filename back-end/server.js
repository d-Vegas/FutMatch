require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Definindo as rotas de usuário
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem Vindo à minha API!' });
});

// Credenciais
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.ldify.mongodb.net/FutMatch`)
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado ao banco e servidor rodando na porta 3000');
        });
    })
    .catch((err) => console.log(err));
