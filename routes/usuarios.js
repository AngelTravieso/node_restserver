const { Router } = require('express');
const router = Router();

const { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete 
} = require('../controllers/usuarios');


router.get('/', usuariosGet );
router.post('/', usuariosPost );
router.put('/', usuariosPut );
router.patch('/', usuariosPatch );
router.delete('/', usuariosDelete );


module.exports = router;