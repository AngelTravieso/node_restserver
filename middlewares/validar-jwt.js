const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {


    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

    try {

        // Verificar jwt (si es valido o no)
        const { uid } = jwt.verify(token, process.env.SECRETORPUBLICKEY);

        // { uid: '63cc4ac43624c22f8916f723', iat: 1674403982, exp: 1674418382 }
        // console.log(payload);

        // crear nueva propiedad en el objeto req
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido',
        })
    }

}

module.exports = {
    validarJWT,
}