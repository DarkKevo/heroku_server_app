//requerimiento de modelo de usuarios
const user = require('../models/user');

//requerimiento de modelo de admins
const adm = require('../models/admin');

//requerimiento de json web token
const jsonwebtoken = require('jsonwebtoken');

//secret config
const config = require('./config');

//creacion de usuario
async function Creacion_De_Usuario(req, res) {
	//objeto nuevo
	const usuario_nuevo = new user({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});
	//encriptacion de password
	usuario_nuevo.password = await usuario_nuevo.encriptar(usuario_nuevo.password);
	//guardado
	try {
		await usuario_nuevo.save();
	} catch (err) {
		alert('Datos no Validos');
		return false
	}
	//generacion de token por registrarse exitosamente
	//NOTA: Tiempo de vencimiento 15min
	const token = jsonwebtoken.sign({ id: usuario_nuevo._id }, config.secret, {
		expiresIn: 60 * 15,
	});
	return token;
}

//creacion de admin
async function Creacion_De_Admin(req, res) {
	//objeto nuevo
	const admin_nuevo = new adm({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});
	//encriptacion de password
	admin_nuevo.password = await admin_nuevo.encriptar(admin_nuevo.password);
	//guardado
	try {
		await admin_nuevo.save();
	} catch (err) {
		alert('Datos no Validos');
		return false
	}
	//generacion de token por registrarse exitosamente
	//NOTA: Tiempo de vencimiento 15min
	const token = jsonwebtoken.sign({ id: admin_nuevo._id }, config.secret, {
		expiresIn: 60 * 15,
	});
	return token;
}

//Exportacion de modulos
module.exports = { Creacion_De_Admin, Creacion_De_Usuario };
