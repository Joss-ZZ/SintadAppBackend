const { response } = require("express");
const Contribuyente = require("../models/Contribuyente");

const listarContribuyente = async(req, res = response)=> {
    try {

        const contribuyenteDB = await Contribuyente.find()
                                        .populate('tipo_documento')
                                        .populate('tipo_contribuyente');

        return res.status(200).json({
            ok: true,
            contribuyenteDB
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}

const registrarContribuyente = async(req, res = response)=> {
    
    const body = req.body;

    try{

        const contribuyente = new Contribuyente(body);
        await contribuyente.save();

        const contribuyenteDB = await Contribuyente.findById(contribuyente._id)
                                        .populate('tipo_documento')
                                        .populate('tipo_contribuyente');

        return res.status(200).json({
            ok: true,
            contribuyenteDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })        
    }
}

const actualizarContribuyente = async(req, res = response)=> {

    const id = req.params.id;
    const {tipo_documento, nro_documento, razon_social, nombre_comercial, tipo_contribuyente, direccion, telefono, estado} = req.body;

    try{

        const contribuyenteDB = await Contribuyente.findById(id);
        if(!contribuyenteDB){
            return res.status(400).json({
                ok: false,
                msg: 'El ID del contribuyente no existe'
            });
        }

        contribuyenteDB.tipo_documento = tipo_documento;
        contribuyenteDB.nro_documento = nro_documento;
        contribuyenteDB.razon_social = razon_social;
        contribuyenteDB.nombre_comercial = nombre_comercial;
        contribuyenteDB.tipo_contribuyente = tipo_contribuyente;
        contribuyenteDB.direccion = direccion;
        contribuyenteDB.telefono = telefono;
        contribuyenteDB.estado = estado;
        await contribuyenteDB.save();

        const contribuyenteDataDB = await Contribuyente.findById(id)
                                                .populate('tipo_documento')
                                                .populate('tipo_contribuyente');

        return res.status(200).json({
            ok: true,
            contribuyenteDataDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })          
    }
}

const eliminarContribuyente = async(req, res = response)=> {

    const id = req.params.id;

    try{

        const contribuyenteDB = await Contribuyente.findByIdAndDelete(id)
                                            .populate('tipo_documento')
                                            .populate('tipo_contribuyente');;
        if(!contribuyenteDB){
            return res.status(400).json({
                ok: false,
                msg: 'El ID del contribuyente no existe'
            });
        }

        return res.status(200).json({
            ok: true,
            contribuyenteDB
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
    listarContribuyente,
    registrarContribuyente,
    actualizarContribuyente,
    eliminarContribuyente
}