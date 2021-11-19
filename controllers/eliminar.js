
const producto = require('../models/producto')
const registro = require("../models/registro")


async function eliminar(req, res) {
	try {
		await producto.findByIdAndDelete(req.params.id);
	} catch (error) {
		console.log(error);
		return false;
	}
	console.log('Data Erased');
	return true;
}


async function eliminar_registro(req,res) {
    try {
        await registro.findByIdAndDelete(req.params.id)
    } catch (error) {
        console.log(error)
        return false
    }
    console.log('Data Erased')
    return true
}

module.exports = { eliminar, eliminar_registro }

