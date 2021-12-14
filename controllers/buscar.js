const { response, request } = require("express");

const buscar = (req = request, res = response) => {

    const {coleccion, termino} = req.params;

    res.json({
        coleccion,
        termino
    })
}

module.exports = {
    buscar
}