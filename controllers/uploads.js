const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req, res = response) => {


  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    return res.status(400).json({ msg: 'No hay archivos que subir' });
  }

  // /* Imágenes */
  // const nombre = await subirArchivo(req.files);

  try {
    // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
    const nombre = await subirArchivo(req.files, undefined, 'imgs');
    res.json({ nombre })
  } catch (msg) {
    res.status(400).json({ msg })
  }




  res.json({ nombre })



}

const actualizarImagen = async (req, res = response) => {
  const {id, coleccion} = req.params;

  res.json({
    id,
    coleccion
  })
}

module.exports = {
  cargarArchivo,
  actualizarImagen
}