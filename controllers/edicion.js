const producto = require('../models/producto')

async function editar_datos(req,res) {

    const nProducto = await producto.updateOne({_id:req.params.id},{
        nombre: req.body.Nombre,
        tipo: req.body.Tipo,
        marca: req.body.Marca,
        descripcion: req.body.Descripcion,
        existencia: req.body.Existencia,
        precio: req.body.Precio
    })
    return nProducto;
}

module.exports = { editar_datos }