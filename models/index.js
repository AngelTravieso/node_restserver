const Categoria = require('./categoria');
const Rol = require('./rol');
const Server = require('./server');
const Usuario = require('./usuario');

// Otra manera de hacerlo
// module.exports = require('./categoria');
// module.exports = require('./rol');
// module.exports = require('./server');
// module.exports = require('./usuario');


module.exports = {
    Categoria,
    Rol,
    Server,
    Usuario,
}
