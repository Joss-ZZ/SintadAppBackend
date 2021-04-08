const { Router } = require('express');
const { listarContribuyente, registrarContribuyente, actualizarContribuyente, eliminarContribuyente } = require('../controllers/contribuyente');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Listar Contribuyentes
router.get('/contribuyente', validarJWT, listarContribuyente);

//Crear Contribuyente.
router.post('/contribuyente', validarJWT, registrarContribuyente);

//Editar Contribuyente.
router.put('/contribuyente/:id', validarJWT, actualizarContribuyente);

//Eliminar Contribuyente.
router.delete('/contribuyente/:id', validarJWT, eliminarContribuyente);

module.exports = router;