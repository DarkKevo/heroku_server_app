//requerimiento de modelo de usuario
const user = require('../models/user');

//requerimiento de json web token
const jsonwebtoken = require('jsonwebtoken');

//requerimiento de modelo de admin
const adm = require('../models/admin');

//requerimiento de secret config
const config = require('./config');

//verificacion de token de user
async function VerifyTokenUser(TokenActual) {
	const token = TokenActual;
	//decodificacion
	const decoded = jsonwebtoken.verify(token, config.secret);
	const id = decoded.id;
	//busqueda
	const busqueda = await user.findById(id, { password: 0 });
	if (!busqueda) {
		console.log('No token Provided');
		return false;
	} else {
		console.log('Valid Token');
		return true;
	}
}

//verificacion de token de admin
async function VerifyTokenAdmin(TokenActual) {
	const token = TokenActual;
	//decodificacion
	const decoded = jsonwebtoken.verify(token, config.secret);
	const id = decoded.id;
	//busqueda
	const busqueda = await adm.findById(id, { password: 0 });
	if (!busqueda) {
		console.log('No token Provided');
		return false;
	} else {
		console.log('Valid Token');
		console.log(busqueda);
		return true;
	}
}

//La continuacion de esta funcion dede estar presente en la ruta del siguiente modo

/* let tokenActual = fhwofhewofewofewoifhewo

ruta.get('/prueba', async(req,res) => {
    VerifyTokenUser(tokenActual)
        .then((resp) => {
            if (!resp) {
                alert('No Tienes Token')
            } else {
                //lo mandas a donde lo tengas que mandar o ejecutar
            }
        })
}) */

module.exports = { VerifyTokenUser, VerifyTokenAdmin };
