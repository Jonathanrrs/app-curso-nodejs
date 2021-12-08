const {Router} = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);

/* arreglo de middlewares [] para validar */
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('rol').custom((rol) => esRolValido(rol)), es lo mismo que abajo
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPost);

router.put('/:id', [
   check('id', 'No es un ID válido') .isMongoId(),
   check('id').custom(existeUsuarioPorId),
   check('rol').custom(esRoleValido),
   validarCampos
],usuariosPut);

router.patch('/', usuariosPatch);


router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido') .isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);

module.exports = router;