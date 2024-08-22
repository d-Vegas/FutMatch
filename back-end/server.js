require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.status(200).json({ msg: 'Bem Vindo a minha API'})
})

//Crendenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
    .connect(`
        mongodb+srv://${dbUser}:${dbPassword}@cluster0.ldify.mongodb.net/FutMatch`
    )
    .then(() =>{
        app.listen(3000)
        console.log('Conectou ao banco!')
    })
    .catch((err) => console.log(err))

app.listen(3000)

