const {Router} = require('express');
const { check } = require('express-validator');
const Role = require('../models/role')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGet);

/* arreglo de middlewares [] para validar */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(async(rol = '') => {
        const existeRol = await Role.findOne({rol});
        if(!existeRol) {
            /* error personalizado  */
            throw new Error(`El rol ${rol} no está registrado en la BD`)
        }
    }),
    validarCampos
],usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);


router.delete('/',usuariosDelete);

module.exports = router;