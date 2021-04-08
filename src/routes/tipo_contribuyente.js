const { Router } = require('express');
const { actualizarTipoContribuyente, eliminarTipoContribuyente, listarTipoContribuyente, listarTipoContribuyenteHabilitados, registrarTipoContribuyente } = require('../controllers/tipo_contribuyente');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Listar Tipos de Contribuyentes
router.get('/tipo_contribuyente', validarJWT, listarTipoContribuyente);

//Listar Tipos de Contribuyentes Habilitados
router.get('/tipo_contribuyente_habilitado', validarJWT, listarTipoContribuyenteHabilitados);

//Crear Tipos de Contribuyentes.
router.post('/tipo_contribuyente', validarJWT, registrarTipoContribuyente);

//Editar Tipos de Contribuyente.
router.put('/tipo_contribuyente/:id', validarJWT, actualizarTipoContribuyente);

//Eliminar Tipo de Contribuyente.
router.delete('/tipo_contribuyente/:id', validarJWT, eliminarTipoContribuyente);

module.exports = router;