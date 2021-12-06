const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const {q, nombre, apikey} = req.query;

    res.json({
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
};

const usuariosPost = async(req, res) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    /* Verificar si el correo existe */

    /* Encriptar contraseña */
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    /* Guardar en BD */
    await usuario.save();


    res.json({
        usuario
    });
};

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'put API - controlador',
        id
    });
};

const usuariosPatch = (req, res) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
};

const usuariosDelete = (req, res) => {
    res.json({
        ok: true,
        msg: 'delete API- controlador'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}