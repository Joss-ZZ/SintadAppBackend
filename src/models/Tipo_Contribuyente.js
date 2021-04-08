const { Schema, model } = require('mongoose');

const Tipo_ContribuyenteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    }
});

module.exports = model('Tipo_Contribuyente', Tipo_ContribuyenteSchema);