const { validationResult } = require('express-validator');

/* es un middleware, se usa next para seguir con el soguiente  */
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next();
}

module.exports = {
    validarCampos
}