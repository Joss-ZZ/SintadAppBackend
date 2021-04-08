const { Schema, model } = require('mongoose');

const ContribuyenteSchema = Schema({
    tipo_documento: {
        type: Schema.Types.ObjectId,
        ref: 'Tipo_Documento',
        required: true
    },
    nro_documento: {
        type: String,
        required: true
    },
    razon_social: {
        type: String,
        required: true
    },
    nombre_comercial: {
        type: String,
        required: true
    },
    tipo_contribuyente: {
      type: Schema.Types.ObjectId,
      ref: 'Tipo_Contribuyente',
      required: true
    },
    direccion: {
      type: String,
      required: true
    },
    telefono: {
      type: String,
      required: true
    },
    estado: {
      type: Boolean,
      required: true
    }
});

module.exports = model('Contribuyente', ContribuyenteSchema);