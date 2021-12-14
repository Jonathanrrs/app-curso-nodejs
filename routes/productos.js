const {Router} = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require('../controllers/productos');
const { existeProductoPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

/* Obtener todos los productos */

router.get('/', obtenerProductos);

/* Obtener ´producto por ID */

router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId).withMessage('El id no existe'),
    validarCampos
], obtenerProducto)

/* Crear producto */

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
], crearProducto);

/* Actualizar producto */

router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId).withMessage('El id no existe'),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarProducto)

/* Eliminar producto */

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeProductoPorId).withMessage('El id no existe'),
], eliminarProducto)

module.exports = router;