const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

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

        res.json({
            msg: 'login ok',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }

}

module.exports = {
    login,
}