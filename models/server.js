require('dotenv').config();
const cors = require('cors');
const express = require('express');
const {
    dbConnection
} = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8081;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conexión a BD
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body (recibir JSON)
        this.app.use(express.json());

        // Directorio public
        this.app.use(express.static('public'));

    }

    routes() {
        // Middleware condicional
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at port: ${this.port}`);
        });
    }

}

module.exports = Server;