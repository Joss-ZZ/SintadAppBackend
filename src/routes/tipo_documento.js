const { Router } = require('express');
const { registrarTipoDocumento, listarTipoDocumento, listarTipoDocumentoHabilitados, actualizarTipoDocumento, eliminarTipoDocumento } = require('../controllers/tipo_documento');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//Listar Tipos de Documentos
router.get('/tipo_documento', validarJWT, listarTipoDocumento);

//Listar Tipos de Documentos Habilitados
router.get('/tipo_documento_habilitado', validarJWT, listarTipoDocumentoHabilitados);

//Crear Tipo de Documento.
router.post('/tipo_documento', validarJWT, registrarTipoDocumento);

//Editar Tipo de Documento.
router.put('/tipo_documento/:id', validarJWT, actualizarTipoDocumento);

//Eliminar Tipo de Documento.
router.delete('/tipo_documento/:id', validarJWT, eliminarTipoDocumento);

module.exports = router;