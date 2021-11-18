const producto = require('../models/producto');

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

module.exports = { eliminar };
