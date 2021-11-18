//requerimiento de express
const express = require('express');

//express router
const rutas = express.Router()

//Controladores
const {Creacion_De_Admin, Creacion_De_Usuario, Nuevo_Producto} = require('../controllers/AllCreation')
const { Inicio_de_Sesion_Usuarios, Inicio_de_Sesion_Admins } = require('../controllers/Inicio_Sesion')
const { VerifyTokenUser } = require('../controllers/Verificaciones')
const {Busqueda} = require('../controllers/busquedas');
//JSONtoken
let token_actuall;

//Rutas de la interfaz
//Inventario
rutas.post('/CrearProducto',async (req,res)=>{
	await Nuevo_Producto(req,res)
	.then((resp) => {
		if(resp == false) {
			console.log('Error en creacion')
		} else {
			res.render("inventario");
		}
	})	
})
rutas.post('/1',(req,res)=>{
	console.log('bien compa')
	//Buscar productos
	//res.render("inventario");
	res.end();
})

//Rutas Finales
rutas.get('/',(req,res)=>{
	res.render("principal");
})
rutas.post('/1',(req,res)=>{
	Inicio_de_Sesion_Admins(req,res);
	res.render("inventario");
})
rutas.post('/Inventario', async(req,res) => {
	await Creacion_De_Admin(req,res)
		.then((resp) => {
			if(resp == false) {
				console.log('Error en creacion')
			} else {
				res.render("inventario");
			}
		})
})
rutas.post('/Inventarios', async(req,res) => {
	await Inicio_de_Sesion_Admins(req,res)
		.then((resp) => {
			if (resp == false) {
				console.log('No iniciaste sesion')
				res.render('Err')
			} else {
				token_actuall = resp;
				res.render("inventario");
			}
		})
	console.log(`El token de inicio de sesion es ${token_actuall}`)
})
rutas.post('/Tienda', async(req,res) => {
	await Creacion_De_Usuario(req,res)
		.then((resp) => {
			if(resp == false) {
				console.log('Error en creacion')
			} else {
				token_actuall = resp;
				res.render("tienda");
			}
		})
	console.log(`Token actual es ${token_actuall}`)
})

rutas.post('/Tiendas', async(req,res) => {
	await Inicio_de_Sesion_Usuarios(req,res)
		.then((resp) => {
			if (resp == false) {
				console.log('No iniciaste sesion')
				res.render('Err')
			} else {
				token_actuall = resp;
				res.render("tienda");
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
