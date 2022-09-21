require('dotenv').config();
const express = require('express');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8081;

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        // Directorio public
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('Hola Mundo');
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at port: ${this.port}`);
        });
    }

}

module.exports = Server;