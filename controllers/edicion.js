const producto = require('../models/producto');

async function editar_datos(req, res) {
	try {
		const nProducto = await producto.updateOne(
			{ _id: req.params.id },
			{
				nombre: req.body.Nombre,
				tipo: req.body.Tipo,
				marca: req.body.Marca,
				descripcion: req.body.Descripcion,
				existencia: req.body.Existencia,
				precio: req.body.Precio,
			}
		);
		//return nProducto;
		return true
	} catch (error) {
		return false
	}
}


async function restar (req,res) {
    let objeto = await producto.findOne({_id: req.params.id}).lean()
    await producto.updateOne({_id: req.params.id}, {
        existencia: objeto.existencia - 1
    })
}

async function sumar (req,res) {
    let objetos = await producto.findOne({_id: req.params.id}).lean()
    console.log(objetos.existencia)
    await producto.updateOne({_id: req.params.id}, {
        existencia: objetos.existencia + 1
    })
}
module.exports = { editar_datos, restar ,sumar }

