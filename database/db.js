const mysql2 = require('mysql2')


const conexion = mysql2.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
})
conexion.connect((error)=>{
    if(error){
        console.log('Error en la conecion' + error)
        return
    }
            console.log('Conectado a mysql agropetwr')
        

})


module.exports = conexion