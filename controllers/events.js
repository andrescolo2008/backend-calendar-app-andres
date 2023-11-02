 const {response}=require('express')
const Evento = require('../models/Evento');


 const getEventos = async(req,res= response)=>{

    const eventos =await Evento.find()

// .populate('user','name')
    
    res.json({
        ok:true,
        eventos
    })  
}

const crearEvento = async(req,res= response)=>{


const evento = new Evento(req.body)

    try {
        evento.user=req.uid;
        
        const eventoGuardado= await evento.save()

        res.json({
            ok:true,
            evento:eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'error al intentar  guardar en la base de datos '
        })
        
    }
     
}


const actualziarEvento= async(req,res= response)=>{

    // se requiere dar una respuesta, por ejemplo 
    res.json({
        ok:true,
        msg:'crearEventos',
        id:'1234567'
    })  
}

const eliminarEvento = async(req,res= response)=>{

    // se requiere dar una respuesta, por ejemplo 
    res.json({
        ok:true,
        msg:'crearEventos',
        id:'9858966'
    })  
}

module.exports={
    actualziarEvento,
    eliminarEvento,
    crearEvento,
    getEventos
}