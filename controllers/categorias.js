const { response, request } = require("express");
const {Categoria} = require('../models');
const { findByIdAndUpdate } = require("../models/usuario");


/* obtenerCategorias . paginado -total - populate */

const obtenerCategorias = async (req, res = response) => {

    const {limite = 3, desde = 0} = req.query;
    const query = {estado: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario')
    ]);

    res.json({
        total,
        categorias
    })
}

/* obtenerCategoria por id - populate {} */

const obtenerCategoria = async(req = request, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario');

    res.json(categoria)
}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    /* Generar la data a guardar */

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    /* Guardar DB */
    await categoria.save();

    res.status(200).json(categoria);

};

/* actualizarCategoria */

const actualizarCategoria = async(req = request, res = response) => {
    const {id} = req.params;
    const usuario = req.usuario._id;
    const nombre = req.body.nombre.toUpperCase();

    const data = {
        nombre,
        usuario
    }

    const categoria = await Categoria.findByIdAndUpdate(id, data)

    res.json(categoria)
}

/* borrarCategoria - estado:false */

const borrarCategoria = async(req = request, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false});

    res.json(categoria)
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}