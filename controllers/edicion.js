const user = require('../models/user')

async function editar_datos(req,res) {
    try {
        await user.update({_id: req.body.Id}, {
            nombre: req.body.Nombre,
            tipo: req.body.Tipo,
            marca: req.body.Marca,
            descripcion: req.body.Descripcion,
            existencia: req.body.Existencia,
            precio: req.body.Precio
        })
    } catch (error) {
        console.log(error)
        return false
    }
    console.log('Data Update its Ok')
    return true
}

module.exports = { editar_datos }