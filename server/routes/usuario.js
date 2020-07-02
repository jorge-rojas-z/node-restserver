const express = require('express');
//encriptar contraseña
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const { verificaToken, verificaRole } = require('../middleware/autenticacion');
const { response } = require('express');
const app = express();

app.get('/usuarios', verificaToken, function(req, res) {
    //res.json('getUsuario')

    //validar que sea numero el req.query
    let desde = Number(req.query.desde) || 0;
    let cant = Number(req.query.cant) || 5;

    //con el string que ponemos estamos filtrando los campos que retornamos
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde * cant)
        .limit(cant)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.countDocuments({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    conteo
                });
            })


        })
});

app.post('/usuarios', [verificaToken, verificaRole], function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: "el campo nombre viene vacio"
        });

    } else {
        let usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            //argumentos: contrasenna, numero de veces pasada por el hash
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });

        usuario.save((err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                usuario: usuarioDB
            });
        })

    }

});

app.put('/usuarios/:id', [verificaToken, verificaRole], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre',
        'email',
        'img',
        'role',
        'estado'
    ]);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuarios/:id', [verificaToken, verificaRole], function(req, res) {
    //res.json('deleteUsuario')
    let id = req.params.id;
    let body = _.pick(req.body, ['estado']);
    body.estado = false;

    //con esto se borra el usuario fisicamente
    //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    Usuario.findByIdAndUpdate(id, body, { new: true, useFindAndModify: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado.'
                }
            })
        };

        res.json({ ok: true, usuario: usuarioBorrado });

    });

});

module.exports = app;