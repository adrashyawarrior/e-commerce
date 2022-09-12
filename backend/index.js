require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./src/routes/routes')

mongoose.connect(process.env.DB_URL);
mongoose.set('toJSON', { virtuals: true });

const app = express()

app.use(cors());

app.use('/uploads', express.static('uploads'));
app.use('/public/images', express.static('public/images'));

app.use(routes);

app.listen(4000);