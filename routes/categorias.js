const {Router} = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();


/* Obtener todas las categorias - publico */
router.get('/', obtenerCategorias);


/* Obtener una categoria por id - publico */
router.get('/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeCategoriaPorId).withMessage('El id no existe'),
    validarCampos
], obtenerCategoria);

/* Crear categoria- privado(cualquier persona con un token valido) */
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

/* Actualizar - privado(cualquiera con token válido) */
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId).withMessage('El id no existe'),
    validarCampos

], actualizarCategoria);

/* Borrar una categoria - admin */
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeCategoriaPorId).withMessage('El id no existe'),
    validarCampos
], borrarCategoria);



module.exports = router;