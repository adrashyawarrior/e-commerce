require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./src/routes/routes')

mongoose.connect(process.env.DB_URL);

const app = express()

app.use(cors());
app.use(routes);

app.listen(4000);