//requerimiento de express
const express = require('express');
const rutas = express.Router();
//requerimiento de modelo de productos
const producto = require('../models/producto');

//Controladores
const {Creacion_De_Admin, Creacion_De_Usuario, Nuevo_Producto} = require('../controllers/AllCreation')
const { Inicio_de_Sesion_Usuarios, Inicio_de_Sesion_Admins } = require('../controllers/Inicio_Sesion')
const { VerifyTokenUser } = require('../controllers/Verificaciones')
const {Busqueda} = require('../controllers/busquedas');
const {editar_datos} = require('../controllers/edicion') 
//JSONtoken
let token_actuall;

//qlq


//Inventario
rutas.post('/CrearProducto',async (req,res)=>{
	await Nuevo_Producto(req,res)
	.then(async (resp) => {
		if(resp == false) {
			console.log('Error en creacion')
		} else {
			const Producto = await producto.find().lean();
			res.render("inventario",{Producto:Producto});
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

rutas.post('/Inventario', async(req,res) => {
	await Creacion_De_Admin(req,res)
		.then(async (resp) => {
			if(resp == false) {
				console.log('Error en creacion')
			} else {
				const Producto = await producto.find().lean();
				console.log(Producto)
				res.render("inventario",{Producto:Producto});
			}
		})
})
rutas.post('/Inventarios', async(req,res) => {
	await Inicio_de_Sesion_Admins(req,res)
		.then( async (resp) => {
			if (resp == false) {
				console.log('No iniciaste sesion')
				res.render('Err')
			} else {
				token_actuall = resp;
				const Producto = await producto.find().lean();
				console.log(Producto)
				res.render("inventario",{Producto:Producto});
			}
		})
	console.log(`El token de inicio de sesion es ${token_actuall}`)
})
//Actualizar
rutas.get('/Actualizar/:id', async (req,res) => {
	const Producto = await producto.findById(req.params.id).lean();	
	res.render('Actualizar',{Producto});		
	})
rutas.post('/Actualizar/:id', async(req,res) => {
	await editar_datos(req,res)
		.then( async (resp) => {
			if (resp == false) {
				console.log('No se encontro el valor a editar');
				res.render('Err');
			} else {
			//AQUI VA LA RUTA
				res.render('Actualizar');		
			}
		})
})
//Eliminar
rutas.get('/Inventario', async(req,res) => {
	await Inicio_de_Sesion_Admins(req,res)
		.then( async (resp) => {
			if (resp == false) {
				console.log('No iniciaste sesion')
				res.render('Err')
			} else {
				token_actuall = resp;
				const Producto = await producto.find().lean();
				console.log(Producto)
				res.render("inventario",{Producto:Producto});
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
