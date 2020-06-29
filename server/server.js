require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
// los app.use son middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;

    console.log('Conectado a Mongo');

});

app.listen(process.env.PORT, () => {
    console.log('escuchando desde el puerto 3000');
});