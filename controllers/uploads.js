const { response } = require("express");

const cargarArchivo = (req, res = response) => {

    res.json({msg: 'hola'})

}

module.exports = {
    cargarArchivo
}