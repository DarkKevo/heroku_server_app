//requerimiento de express
const express = require('express')

//express router
let rutas = express.Router()

//Ruta de Prueba
rutas.get('/test', (req,res) => {
    res.json({status: 'ok', message: 'Good Server'})
})

//exportacion
module.exports = rutas