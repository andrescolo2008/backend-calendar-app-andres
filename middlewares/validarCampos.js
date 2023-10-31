
const {response}=require('express')
const {validationResult}=require('express-validator')


  const  validarcampos = (req,res= response,next ) =>{// next ejecutará la siguiente linea de código 
        //manejo de errores
    const errors=validationResult(req)

    if(!errors.isEmpty() ){
     return res.status(400).json({
         ok:false,
         errors:errors.mapped()
     })

}
            next();
}

module.exports= {
    validarcampos
}
