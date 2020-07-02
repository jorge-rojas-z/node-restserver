//VERIFICA TOKEN
const jwt = require('jsonwebtoken')
    // Verificar token

let verificaToken = (req, res, next) => {
    //capturar token de los headers
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token invalido.'
                }
            });
        };

        req.usuario = decoded.usuario;
        next();
    })

};

// VERIFICA ROLE

let verificaRole = (req, res, next) => {
    //capturar token de los headers
    //req.usuario.role =

    if (req.usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            ok: false,
            err: {
                message: 'Permisos insuficientes.'
            }
        });
    };
    next();


};

module.exports = { verificaToken, verificaRole };