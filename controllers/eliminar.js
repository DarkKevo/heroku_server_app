const user = require('../models/user')

async function eliminar(req,res) {
    try {
        await user.findByIdAndDelete(req.body.Id)
    } catch (error) {
        console.log(error)
        return false
    }
    console.log('Data Erased')
    return true
}

module.exports = { eliminar }