const {response, request} = require('express');

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

const usuariosPost = (req, res) => {

    /* obtener data del body */
    // const body = req.body;
    const {nombre, edad} = req.body;


    res.json({
        ok: true,
        msg: 'post API - controlador',
        nombre,
        edad
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