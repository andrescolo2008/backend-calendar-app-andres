// hacer la petición, que pase por el middle ware

const { Router } = require("express");
const { getEventos, crearEvento, actualziarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require("express-validator");
const { validarcampos } = require("../middlewares/validarCampos");
const { isDate } = require("../helpers/isDate");

const  router= Router();
router.use(validarJWT); // todo lo que este debajo de esto, aplicara  para donde se utilice el router,es decir, van a quedar portegidas por el JWT, lo que quede por encima será público

// obtener eventos 
router.get('/get',getEventos )
// crear nuevo evento 
router.post('/new',
[
    check('title','el título es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalización es obligatoria').custom(isDate),
        validarcampos
]
,
crearEvento )
//Actualziar  eventos 
router.put('/update:id',actualziarEvento )

//Borrar evento
router.delete('/delete:id', eliminarEvento )

module.exports= router

