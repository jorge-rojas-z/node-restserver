require('./config/config.js');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// parse application/x-www-form-urlencoded
// los app.use son middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/usuarios', function(req, res) {
    res.json('getUsuario')
})

app.post('/usuarios', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "el campo nombre viene vacio"
        });

    } else {
        res.json({ usuario });
    }

});

app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuarios', function(req, res) {
    res.json('deleteUsuario')
});

app.listen(process.env.PORT, () => {
    console.log('escuchando desde el puerto 3000');
});