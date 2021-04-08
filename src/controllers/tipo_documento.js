const { response } = require("express");
const Tipo_Documento = require("../models/Tipo_Documento");

const listarTipoDocumento = async(req, res = response)=> {
    try {

        const tipoDocumentoDB = await Tipo_Documento.find();

        return res.status(200).json({
            ok: true,
            tipoDocumentoDB
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}

const listarTipoDocumentoHabilitados = async(req, res = response)=> {
    try {

        const tipoDocumentoDB = await Tipo_Documento.find({estado:true});

        return res.status(200).json({
            ok: true,
            tipoDocumentoDB
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}

const registrarTipoDocumento = async(req, res = response)=> {

    const body = req.body;
    
    try{
        const tipo_Documento = new Tipo_Documento(body);
        await tipo_Documento.save();

        const tipoDocumentoDB = await Tipo_Documento.findById(tipo_Documento._id);

        return res.status(200).json({
            ok: true,
            tipoDocumentoDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })        
    }
}

const actualizarTipoDocumento = async(req, res = response)=> {

    const id = req.params.id;
    const {codigo, nombre, descripcion, estado} = req.body;

    try{

        const tipoDocumentoDB = await Tipo_Documento.findById(id);
        if(!tipoDocumentoDB){
            return res.status(400).json({
                ok: false,
                msg: 'El ID del tipo de documento no existe'
            });
        }

        tipoDocumentoDB.codigo = codigo;
        tipoDocumentoDB.nombre = nombre;
        tipoDocumentoDB.descripcion = descripcion;
        tipoDocumentoDB.estado = estado;
        await tipoDocumentoDB.save();

        return res.status(200).json({
            ok: true,
            tipoDocumentoDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })          
    }
}

const eliminarTipoDocumento = async(req, res = response)=> {

    const id = req.params.id;

    try{

        const tipoDocumentoDB = await Tipo_Documento.findByIdAndDelete(id);
        if(!tipoDocumentoDB){
            return res.status(400).json({
                ok: false,
                msg: 'El ID del tipo de documento no existe'
            });
        }

        return res.status(200).json({
            ok: true,
            tipoDocumentoDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })          
    }
}

module.exports = {
    listarTipoDocumento,
    listarTipoDocumentoHabilitados,
    registrarTipoDocumento,
    actualizarTipoDocumento,
    eliminarTipoDocumento
}