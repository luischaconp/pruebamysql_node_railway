const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const conexion = require("../database/db");

router.get("/login", (req, res) => {
  res.render("login", { alert: false });
});

router.get("/", (req, res) => {
  res.render("menu", { user: req.user });
});
router.get("/usuarios", (req, res) => {
  res.render("usuarios");
});
router.get("/registraruse", (req, res) => {
  res.render("registraruse");
});

router.get("/rfactura", (req, res) => {
  conexion.query('select idarea, nombre from area',(error,results)=>{
    if(error){
        throw error;
    }else{
        res.render('rfactura.ejs',{results:results});
    }
  });

  res.render("rfactura");
});
router.get("/reporte", (req, res) => {
  res.render("reporte");
});

router.get("/prueba", (req, res) => {
    conexion.query('select idarea, nombre from area',(error,results)=>{
      if(error){
          throw error;
      }else{
          res.render('prueba.ejs',{results:results});
      }
    })
  });

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




// metodos de auteticación
router.post("/registraruse", authController.registraruse);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/prueba", authController.logout);

module.exports = router;
