const { response } = require("../routes");
const Usuario = require("../models/Usuario");
const {generarJWT} = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

const loginUsuario = async(req ,res = response) => {

    const {email, password} = req.body;

    try{
        //primero verificamos que exista el email
        const user = await Usuario.findOne({email});
        console.log(user);

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'El email o password ingresado es incorrecto'
            });
        }

        //ahora comparamos la contraseña
        const passwordValido = bcrypt.compareSync(password, user.password);
        
        if(!passwordValido){
            return res.status(400).json({
                ok: false,
                msg: 'El email o password ingresado es incorrecto'
            });
        }

        //Generamos el JWT
        const token = await generarJWT(user.id, user.nombre);

        return res.status(200).json({
            ok: true,
            uid: user.id,
            nombre: user.nombre,
            email: user.email,
            token
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        });
    }
} 

const revalidarToken = async(req, res = response)=> {
    
    const {uid, nombre} = req;

    try{

        //Generamos un nuevo token
        const token = await generarJWT(uid, nombre);

        //Buscamos al usuario en la Base de datos
        const userDB = await Usuario.findById(uid);

        res.json({
            ok: true,
            uid: userDB.id,
            nombre: userDB.nombre,
            email: userDB.email,
            token
    }) 

    }catch(error){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Póngase en contacto con el administrador'
        });
    }

}

module.exports = {
    loginUsuario,
    revalidarToken
}