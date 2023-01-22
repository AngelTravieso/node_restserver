const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

// Login usuario
const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email',
            });
        }

        // Verificar si el usuario está activo
        if (!usuario.state) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - state: false',
            });
        }

        // Verificar la contraseña
        // Compara el password que llega con el guardado en la BD
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password',
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }

}

// 
const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    // Verificar token de google (que sea valido)
    const googleUser = await googleVerify(id_token);

    try {
        res.json({
            msg: 'Todo ok! google signin',
            googleUser,
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido',
        });
    }

}

module.exports = {
    login,
    googleSignIn,
}