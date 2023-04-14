
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
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

  router.get('/api/area', (req, res) => {
    conexion.query('Select idarea, nombre from area',(error,filas)=>{
      if(error){
          throw error;
      }else{
          res.send(filas);
      }
    })
  });
  
  