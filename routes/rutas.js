//requerimiento de express
const express = require('express');

//express router
const rutas = express.Router()

const user = require('../models/user')

//llamado de funcion de creacion test
const {
	signup_user,
	signin,
	verifyToken
} = require('../controllers/user_functions');

//actually token
let actually_token;

//Rutas de la interfaz
rutas.get('/',(req,res)=>{
    res.render("principal");
})
rutas.get('/1',(req,res)=>{
    res.render("inventario");
})

rutas.get('/2',(req,res)=>{
    signup_user()
	res.render("tienda");
})


//importar model

//Ruta de Prueba
rutas.post('/test/creacion', async (req, res) => {
	const { username, email, password } = req.body;
	await signup_user(username, email, password).then((res) => {
		actually_token = res;
	});
	console.log(`El token es ${actually_token}`);
	res.json({ status: 'ok', message: 'Good Server' });
});

rutas.post('/test/signin', async (req, res) => {
	const { email, password } = req.body;
	await signin(email, password).then((res) => {
		actually_token = res;
	});
	res.json({ status: 'ok', message: 'Good Server' });
});

rutas.post('/test/verify', async (req, res) => {
    let Id
	await verifyToken(actually_token)
        .then((res) => {
            Id = res
        })
    console.log(Id)
	//continuacion de verify token debe ir en la rutas
	const busqueda = await user.findById(Id, { password: 0 });
	if (!busqueda) {
		return res.status(404).send('not found user xd');
	} else {
		console.log(busqueda);
	}
});

//exportacion
module.exports = rutas;
