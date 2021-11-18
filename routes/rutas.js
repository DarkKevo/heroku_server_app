//requerimiento de express
const express = require('express');

//express router
const rutas = express.Router()

const user = require('../models/user')

//llamado de controladores
/* const {Creacion_De_Admin, Creacion_De_Usuario} = require('../controllers/AllCreation');
const {Inicio_de_Sesion_Usuarios, Inicio_de_Sesion_Admins}= require('../controllers/Inicio_Sesion');
const {VerifyTokenUser, VerifyTokenAdmin}= require('../controllers/Verificaciones'); */

//actually token
let actually_token;

//Rutas de la interfaz
rutas.get('/',(req,res)=>{
    res.render("principal");
})
rutas.get('/1',(req,res)=>{
    Inicio_de_Sesion_Admins(req,res);
	res.render("inventario");
})
rutas.post('/2',(req,res)=>{
    Creacion_De_Usuario(req,res)
	res.render("tienda");
})
rutas.get('/2',(req,res)=>{
    Inicio_de_Sesion_Usuarios(req,res);
	res.render("tienda");
})
//Inventario
rutas.post('/1',(req,res)=>{
    //CREAR PRODUCTO
	res.render("inventario");
})
rutas.post('/1',(req,res)=>{
    console.log('bien compa')
	//Buscar productos
	//res.render("inventario");
	res.end();
})

//requerimientos pa probar
const { Creacion_De_Usuario } = require('../controllers/AllCreation')
const { Inicio_de_Sesion_Usuarios } = require('../controllers/Inicio_Sesion')
const { VerifyTokenUser } = require('../controllers/Verificaciones')

//Rutas de Prueba de Funciones Finales
let token_actuall

rutas.post('/pruebadecreaciondeusuario', async(req,res) => {
	await Creacion_De_Usuario(req,res)
		.then((resp) => {
			if(resp == false) {
				console.log('Error en creacion')
			} else {
				token_actuall = resp
			}
		})
	console.log(`Token actual es ${token_actuall}`)
})

rutas.post('/pruebadeiniciarsesion', async(req,res) => {
	await Inicio_de_Sesion_Usuarios(req,res)
		.then((resp) => {
			if (resp == false) {
				console.log('No iniciaste sesion')
			} else {
				token_actuall = resp
			}
		})
	console.log(`El token de inicio de sesion es ${token_actuall}`)
})

rutas.get('/pruebadeverificacion', async(req,res) => {
	await VerifyTokenUser(token_actuall)
		.then((resp) => {
			if (resp == false) {
				console.log('token expired or invalid')
			} else {
				console.log('Valid Token Nice')
			}
		})
})

//exportacion
module.exports = rutas;
