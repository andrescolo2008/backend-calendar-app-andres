//Rutas de Ususarios / Auth
// host + /api/auth 


const {Router} = require('express')
const {check} = require('express-validator')
// check va a ser el middleware que va a validar un campo a la vez 

const { validarcampos } = require('../middlewares/validarCampos');
const {crearUsuario, loginUsuario, revalidarToken}= require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const  router= Router();


router.post('/new',

[
    // aquívienen los middlewares
    check('name', ' El nombre es obligatorio ').not().isEmpty(),
    check('email', ' El email es obligatorio ').isEmail(),
    check('password', ' El password debe ser minimo de 6 caracteres  ').isLength({min:6}),
    validarcampos
]

,crearUsuario);

router.post('/',
[
    // aquívienen los middlewares
    check('email', ' El email es obligatorio ').isEmail(),
    check('password', ' El password debe ser minimo de 6 caracteres  ').isLength({min:6}),
    validarcampos
]
,loginUsuario)

router.get('/renew',validarJWT,revalidarToken)

module.exports = router;