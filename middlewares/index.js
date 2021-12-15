const validaCampos = require('../middlewares/validar-campos');
const validaJWT  = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');

/* ... extrae todo lo de adentro */
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validarArchivo
}
