const { response, request } = require("express");
const { json } = require("express/lib/response");
const {Producto} = require('../models');
const {Categoria} = require('../models');

/* Obtener todos los productos */

const obtenerProductos = async(req = request, res = response) => {
    const {limite = 3, desde = 0} = req.query;
    const query = {estado: true};

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ]);

    res.json({
        total,
        productos
    })
}

/* Obtener ´producto por ID */

const obtenerProducto = async(req = request, res = response) => {
    const {id} = req.params;

    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json(producto);
}

/* Crear producto */
const crearProducto = async(req= request, res = response) => {
   
    // const {nombre, estado, precio, categoria, descripcion, disponible} = req.body;
    const {estado, usuario, ...body} = req.body;
   
    const productoDB = await Producto.findOne({nombre: body.nombre.toUpperCase()});
    if(productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }
    const categoriaDB = await Categoria.findById(body.categoria);
    if(!categoriaDB) {
        return res.status(400).json({
            msg: `La categoria no existe`
        });
    }

    const data = {
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,  
        descripcion: body.descripcion.toUpperCase(),
        ...body
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(200).json(producto)

}

/* Actualizar producto */

const actualizarProducto = async(req = request, res = response) => {
    const {id} = req.params;
    // const {nombre, estado, precio, categoria, descripcion, disponible} = req.body;
    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre.toUpperCase()});
    if(productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe`
        });
    }
    const categoriaDB = await Categoria.findById(body.categoria);
    if(!categoriaDB) {
        return res.status(400).json({
            msg: `La categoria no existe`
        });
    }

    const data = {
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id,  
        descripcion: body.descripcion.toUpperCase(),
        ...body
    }

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json(producto);


}

/* Eliminar producto */

const eliminarProducto = async(req = request, res = response) => {
    const {id} = req.params;

    const productoEliminado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json(productoEliminado)

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
}