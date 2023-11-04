 const {response}=require('express')
const Evento = require('../models/Evento');


 const getEventos = async(req,res= response)=>{

    const eventos =await Evento.find()

.populate('user','name')
    
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

   const eventoId= req.params.id;
   const uid = req.uid

    try {

        const evento= await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:'no existe el evento identificado con este id'
            })
        }
        
        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:' No tiene  el privilegio para editar el evento creado por otro usuario '
            })
        }

        const nuevoEvento ={
            ...req.body,
            user:uid
        }

        const eventoActualizado =await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});

        res.json({
            ok:true,
            evento:eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No se pudo actualziar la información- hable con el adminsitrador '
        })
    }

}

const eliminarEvento = async(req,res= response)=>{

    const eventoId= req.params.id;
    const uid = req.uid

    try {

        const evento= await Evento.findById(eventoId);
        if(!evento){
          return  res.status(404).json({
                ok:false,
                msg:'nose puede eliminar este eventoporque no existe el evento identificado con este id'
            })
        }
        
        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:' No tiene  el privilegio para eliminar el evento creado por otro usuario '
            })
        }

        

        await Evento.findByIdAndDelete(eventoId)

        

        res.json({
            ok:true,
            msg:"evento eliminado"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'No se pudo eliminar la información- hable con el adminsitrador '
        })
    }
    
}

module.exports={
    actualziarEvento,
    eliminarEvento,
    crearEvento,
    getEventos
}