const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    /* limite que viene de la url get ?limite=algo */
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments(query);

    /* await para que espere la resolución de ambas promesas */
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))

    ]);

    res.json({
        total,
        usuarios
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
    const { _id, password, google, correo,...resto } = req.body;

    /* TODO validar contra base de datos */
    if (password) {
        /* Encriptar contraseña */
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);


    res.json(usuario);
};

const usuariosPatch = (req, res) => {
    res.json({
        ok: true,
        msg: 'patch API - controlador'
    });
};

const usuariosDelete = async (req, res) => {

    const {id} = req.params;
    
    /* No es del todo correcto esto */
    // const uid = req.uid

    /* Fisicamente lo borramos */
    // const usuario = await Usuario.findByIdAndDelete(id);
    
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    const usuarioAutenticado = req.usuario;

    res.json({usuario, usuarioAutenticado});
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}