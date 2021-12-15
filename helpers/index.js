const dbValidators = require('./db-validators');
const generarJWT= require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

/* para esparcir todas las propiedades dentro de ellos*/
module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}