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
            res.json({
                msg: 'get API',
            });
        });

        this.app.put('/api', (req, res) => {
            res.status(401).json({
                msg: 'put API',
            });
        });

        this.app.post('/api', (req, res) => {
            res.status(201).json({
                msg: 'post API',
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete API',
            });
        });

        this.app.patch('/api', (req, res) => {
            res.json({
                msg: 'patch API',
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running at port: ${this.port}`);
        });
    }

}

module.exports = Server;