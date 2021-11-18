//requerimiento de modelo de productos
const Producto = require('../models/producto');

async function Busqueda(req, res) {
	let producto;
	switch (req.body.atributo) {
		case 'nombre':
			producto = await Producto.find({ nombre: req.body.Dato })
				.then((producto) => {
					console.log(producto);
				})
				.catch((err) => console.log(err));
			break;
		case 'tipo':
			producto = await Producto.find({ tipo: req.body.dato })
				.then((producto) => {
					console.log(producto);
				})
				.catch((err) => console.log(err));
			break;
		case 'marca':
			producto = await Producto.find({ marca: req.body.dato })
				.then((producto) => {
					console.log(producto);
				})
				.catch((err) => console.log(err));
			break;
		case 'descripcion':
			producto = await Producto.find({ descripcion: req.body.dato })
				.then((producto) => {
					console.log(producto);
				})
				.catch((err) => console.log(err));
			break;
		case 'existencia':
			producto = await Producto.find({ existencia: req.body.dato })
				.then((producto) => {
					console.log(producto);
				})
				.catch((err) => console.log(err));
			break;
		case 'precio':
			producto = await Producto.find({ precio: req.body.dato })
				.then((producto) => {
					console.log(producto);
				})
				.catch((err) => console.log(err));
			break;
		default:
			res.send(
				'La categoria selecionada, no se encuentra en el sistema, por favor intente con alguna de estas [tipo,marca,modelo,descripcion,precio,id]'
			);
	}
	return producto;
}

module.exports = { Busqueda }