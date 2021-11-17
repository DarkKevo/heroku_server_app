//requerimiento de express
const express = require('express')

//express router
const rutas = express.Router()

//Rutas de la interfaz
rutas.get('/',(req,res)=>{
	res.render("principal");
})
rutas.get('/1',(req,res)=>{
	res.render("inventario");
})

//Ruta de Prueba
rutas.get('/test', (req,res) => {
    res.json({status: 'ok', message: 'Good Server'})
})

//exportacion
module.exports = rutas;