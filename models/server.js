require('dotenv').config();
const cors = require('cors');
const express = require('express');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8081;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        
        // Directorio public
        this.app.use( express.static('public') );

        // Lectura y parseo del body (recibir JSON)
        this.app.use( express.json() );
    }

    routes() {
        // Middleware condicional
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at port: ${this.port}`);
        });
    }

}

module.exports = Server;