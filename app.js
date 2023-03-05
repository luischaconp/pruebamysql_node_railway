const mysql =require('myslq');

const conexion = mysql.createConnection({
    host: 'localhost',
    datebase: 'agropetwr',
    user: 'root',
    password: ''

});

conexion.connect( function(error){
    if(error){ throw error}
    else{
        console.log('conectado')
    }

})
conexion.end();