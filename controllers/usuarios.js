const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = (req = request, res = response) => {

    const { q, nombre, apikey } = req.query;

    res.json({
        ok: true,
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
};

const usuariosPost = async (req, res) => {



    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    /* Encriptar contraseña */
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    /* Guardar en BD */
    await usuario.save();


    res.json({
        usuario
    });
};

const usuariosPut = async (req, res) => {

    const id = req.params.id;
    const { password, google, correo,...resto } = req.body;

    /* TODO validar contra base de datos */
    if (password) {
        /* Encriptar contraseña */
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json({
        ok: true,
        msg: 'put API - controlador',
        usuario
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