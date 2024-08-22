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

app.listen(3000)

