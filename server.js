const express = require('express');
const app = express();

// const request = require('request');

app.use(express.static(__dirname + "/public"));


// app.get('/', function(req, res) {
//     res.send({ message: 'welcome to praedictio server!' });
// });

app.listen(3001);
