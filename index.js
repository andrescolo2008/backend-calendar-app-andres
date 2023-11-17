const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors= require('cors')
// console.log( process.env);

// Crear el servidor de express

const app = express();

//base de datos 
dbConnection();

// CORS
app.use(cors())

// Directorio  Público

app.use(express.static('public') )

// Lectura y parseo del body 
app.use(express.json() )
// RUTAS
//TODO auth// crear,login,renew
app.use('/api/auth',require('./routes/auth') )// todo lo que este archivovaya a exportar(./routes/auth), lo va a habilitar en esta ruta('/api/auth')

//TODO CRUD:Eventos

app.use('/api/events',require('./routes/events') )


app.get('*',(req,res) =>{

    res.sendFile(__dirname + '/public/index.html')
})


// Escuchar peticiones 
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
    
})