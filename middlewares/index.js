const validaCampos = require('../middlewares/validar-campos');
const validaJWT  = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

/* ... extrae todo lo de adentro */
module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
}
