//requerimiento de modelo
const user = require('../models/user');

//requerimiento de json web token
const jsonwebtoken = require('jsonwebtoken');

//requerimiento de secret config
const config = require('./config');

//creacion
async function signup_user(username, email, password) {
	//creacion de nuevo objeto
	const new_user = new user({
		username: username,
		email: email,
		password: password,
	});

	//encriptacion de la propiedad password con metodo de user
	new_user.password = await new_user.encriptar(new_user.password);

	//guardado
	try {
		await new_user.save();
	} catch (error) {
		return console.log(error);
	}

	//generacion de token con expiracion de 15 minutos
	const token = jsonwebtoken.sign({ id: new_user._id }, config.secret, {
		expiresIn: 60 * 15,
	});
	return token;
}

//inicio de sesion
async function signin(email, password) {
	//busqueda de email
	const usuario2 = await user.findOne({ email: email });

	//verificacion de existencia
	if (!usuario2) {
		return console.log('Email no existente')
	}

	//verificacion de password
	const verify = await usuario2.verificar(password);

	//verificacion para token
	if (!verify) {
		return console.log('Password incorrecta')
	}

	//generacion de token con expiracion de 15 minutos
	const token = jsonwebtoken.sign({ id: usuario2._id }, config.secret, {
		expiresIn: 60 * 15,
	});
	return token;
}

//verificar token
async function verifyToken (variable_de_token) {
    const token =  variable_de_token

    //decodificacion de token
    const decoded = jsonwebtoken.verify(token, config.secret)
    const id = decoded.id
    return id
}

/* //continuacion de verify token debe ir en la rutas 
const busqueda = await user.findById(req.userId, {password: 0})
    if (!busqueda){
        return res.status(404).send('not found')
    } else {
        res.json(busqueda)
    }
 */
//exportacion de funciones
module.exports = { signup_user, signin, verifyToken }
