const { response } = require("express");
const Tipo_Contribuyente = require("../models/Tipo_Contribuyente");

const listarTipoContribuyente = async(req, res = response)=> {
    try {

        const tipoContribuyenteDB = await Tipo_Contribuyente.find();

        return res.status(200).json({
            ok: true,
            tipoContribuyenteDB
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}

const listarTipoContribuyenteHabilitados = async(req, res = response)=> {
    try {

        const tipoContribuyenteDB = await Tipo_Contribuyente.find({estado:true});

        return res.status(200).json({
            ok: true,
            tipoContribuyenteDB
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })
    }
}

const registrarTipoContribuyente = async(req, res = response)=> {

    const body = req.body;
    
    try{

        const tipo_Contribuyente = new Tipo_Contribuyente(body);
        await tipo_Contribuyente.save();

        const tipoContribuyenteDB = await Tipo_Contribuyente.findById(tipo_Contribuyente._id);

        return res.status(200).json({
            ok: true,
            tipoContribuyenteDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })        
    }
}

const actualizarTipoContribuyente = async(req, res = response)=> {

    const id = req.params.id;
    const {nombre, estado} = req.body;

    try{

        const tipoContribuyenteDB = await Tipo_Contribuyente.findById(id);
        if(!tipoContribuyenteDB){
            return res.status(400).json({
                ok: false,
                msg: 'El ID del tipo de contribuyente no existe'
            });
        }

        tipoContribuyenteDB.nombre = nombre;
        tipoContribuyenteDB.estado = estado;
        await tipoContribuyenteDB.save();

        return res.status(200).json({
            ok: true,
            tipoContribuyenteDB
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        })          
    }
}

const eliminarTipoContribuyente = async(req, res = response)=> {

    const id = req.params.id;

    try{

        const tipoContribuyenteDB = await Tipo_Contribuyente.findByIdAndDelete(id);
        if(!tipoContribuyenteDB){
            return res.status(400).json({
                ok: false,
                msg: 'El ID del tipo de contribuyente no existe'
            });
        }

        return res.status(200).json({
            ok: true,
            tipoContribuyenteDB
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
    listarTipoContribuyente,
    listarTipoContribuyenteHabilitados,
    registrarTipoContribuyente,
    actualizarTipoContribuyente,
    eliminarTipoContribuyente
}