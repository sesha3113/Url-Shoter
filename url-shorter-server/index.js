'use strict';

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require('dotenv').config().parsed;
const { saveShortUrl, getShortUrl, getAllUrl, connect } = require('./script');

const port = env.PORT || 3000;
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req, res) => {
    connect()
    res.status(200).send("ok");
});

app.post('/url', (req, res) => {
    saveShortUrl(req.body.url).then(async (response) => {
        console.log("response aa", response);
        res.status(200).send(response.sk_key);
    });
})

app.get('/redirect/:key', (req, res) => {
    var key = req.params.key;
    getShortUrl(key).then(async (response) => {
        console.log("response", response);
        res.redirect(response.pk_url);
    })
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
});