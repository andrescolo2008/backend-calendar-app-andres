const jwt = require('jsonwebtoken')

const generarJWT =(uid,name)=>{

    return new Promise ((resolve,reject) =>{

        const payload   = {uid,name};
        jwt.sign( payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        }, (err,token) =>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token ')
            }

            resolve(token);
        })
        // SECRET_JWT_SEED, ESTA ES LA PALABRA CLAVE O SECRECTA, AYUDARÁ A BACKEND A SABER  SABER SI EL TOKEN LO GENERÉ YO  O NO  
    })

}

module.exports={
    generarJWT
}