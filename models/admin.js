//requerimiento de esquema y modelo
const { Schema, model } = require('mongoose')

//Model Schema
const admin_object = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//exportacion de modelo
module.exports = model ('administradores', admin_object)