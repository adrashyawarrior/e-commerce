const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.send("Hi Lalit, I am working...");
});

app.listen(4000);