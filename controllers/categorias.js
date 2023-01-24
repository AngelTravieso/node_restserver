const { response } = require("express");
const { Categoria, Usuario } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {

    const { limite = 10, desde = 0 } = req.query;

    // query, traer categorias con state: true
    const query = { state: true };

    // Buscar categorias con parametros
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find(query)
            /*
                mantener referencia de la colección de usuario
                datos del usuario que creo la categoria
            */
            .populate('usuario')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);


    res.json({
        total,
        categorias,
    });

}

// obtenerCategoria - populate {}
const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findById(id)
        .populate('usuario');

    res.json(categoria);

}

// Crear categoria
const crearCategoria = async (req, res = response) => {

    // capitalizar nombre de categoria
    const nombre = req.body.nombre.toUpperCase();

    try {
        const categoriaDB = await Categoria.findOne({ nombre });

        // Si la categoria ya esta creada
        if (categoriaDB) {
            res.status(400).json({
                msg: `La categoria ${nombre} ya existe`,
            });
        }

        // Generar la data a guardar
        const data = {
            nombre,
            // Id del usuario en mongoDB
            usuario: req.usuario._id,
        }

        // Crear modelo con datos
        const categoria = new Categoria(data);

        // Guardar en DB
        await categoria.save();


        res.status(201).json(categoria);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'algo anda mal, hable con el administrador',
        });
    }

}

// actualizar categoria (solo recibe el nombre)

// eliminar categoria - state: false

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
}