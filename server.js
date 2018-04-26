const express = require('express');
const app = express();

// const request = require('request');

app.use(express.static(__dirname + "/public"));


app.listen(8000);
