
const express = require("express");
const router = express.Router();

const authController = require("./authController");
const conexion = require("../database/db");
// prueba de datatable

router.get('/api/users', (req, res) => {
    
    conexion.query('Select idusuario, usuario, password, rol_idrol from usuario',(error,filas)=>{
      if(error){
          throw error;
      }else{
          res.send(filas);
      }
    })
  });

 
  
  