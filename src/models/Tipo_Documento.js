const { Schema, model } = require('mongoose');

const Tipo_DocumentoSchema = Schema({
    codigo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    }
});

module.exports = model('Tipo_Documento', Tipo_DocumentoSchema);