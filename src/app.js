import express from 'express'
import { pool } from '../database/db.js'
import {PORT} from '../config/config.js'


const app= express()

app.get('/mostrar', async (req, res)=>{
    const [rows] = await pool.query('select * from usuario where idusuario= "10"')
    res.json(rows)
})

app.get('/ping', async(req, res)=>{
   const [result]  =await pool.query('select "hello word" as Resultado' )
   res.json(result[0])
})

app.get('/registrar', async(req, res)=>{
    const result = await 
    pool.query('insert into usuario (usuario, password, rol_idrol) values ("angeldominguez","lukd48*//","3" )')
    res.json(result)
 })
 

app.listen(PORT)
console.log('Servidor on port ' + PORT )