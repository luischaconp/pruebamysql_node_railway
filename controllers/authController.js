const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promisify} = require('util')



exports.registraruse = async (req, res) => {
    try {
        const user = req.body.user
        const pass = req.body.pass
        const rol  = req.body.rol
        
        let passHash = await bcryptjs.hash(pass, 10)
        conexion.query('use agropetwr;')
      
            conexion.query('insert INTO usuario SET ?', { usuario: user, password: passHash, rol_idrol:rol   }, (error, results) => {    
            if (error) { console.log(error) }
            res.redirect('/usuarios')
        })
    } catch (error) {
    }

}

exports.login = async (req, res)=>{
    try {
        const user = req.body.user
        const pass = req.body.pass        

        if(!user || !pass ){
            res.render('login',{
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT usuario, password FROM usuario WHERE usuario = ?', [user], async (error, results)=>{
                if( results.length == 0 || ! (await bcryptjs.compare(pass, results[0].password)) ){
                    res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    //inicio de sesión OK
                    const id = results[0].id
                   res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon:'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                   })
                }
            })
        }
    } catch (error) {
        console.log(error)
    }
}

exports.isAuthenticated = async (req, res, next)=>{
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)( process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuario WHERE password = ?', [decodificada.id], (error, results)=>{
                if(!results){return next()}
                req.user = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    }else{
        res.redirect('/login')        
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt')   
    return res.redirect('/')
}



