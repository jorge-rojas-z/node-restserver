// RECORDAR QUE EL SERVER.JS DEBE SER SUPER SENCILLO
require('./config/config.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// parse application/x-www-form-urlencoded
// los app.use son middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//habilitar la carpeta public3
console.log(path.resolve(__dirname, '../public'));
app.use(express.static(path.resolve(__dirname, '../public')));

//configuración de rutas
app.use(require('./routes/index.js'));

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