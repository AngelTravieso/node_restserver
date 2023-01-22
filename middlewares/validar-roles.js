const { response } = require("express")


const esAdminRole = (req, res = response, next) => {

    // No se ha validado bien
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero',
        });
    }

    const { rol, nombre } = req.usuario;

    // Si no tiene rol de ADMIN_ROLE no puede hacer x acción
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - no puede hacer esto`,
        });
    }


    next();

}

module.exports = {
    esAdminRole,
}