require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL);

const app = express()

app.get('', (req, res) => {
    res.send("Hi Lalit, I am working...");
});

app.listen(4000);