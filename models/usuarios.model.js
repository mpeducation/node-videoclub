import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UsuarioSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true, /* fields => createAt y updateAt */
        versionKey: false /* le quita el field __v */
    }
)

// Métodos Mongoose
// https://www.npmjs.com/package/bcrypt

UsuarioSchema.methods.encriptarPassword = async (password) => { // no manejan el this.
    const salt = await bcrypt.genSalt(10) // Una semilla // Una cadena aleatoria de caracteres
    return await bcrypt.hash(password, salt) // encriptando el password (unidireccional)
}

UsuarioSchema.methods.comprobarPassword = async function(password) { // maneja this
    return await bcrypt.compare(password, this.password) // true o false
}

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema)

/* -------------------------------------------------- */
/* Métodos de interacción con la Base de datos        */
/* -------------------------------------------------- */

const getUserByEmail = async (email) => {

    try {
        const userFound = await UsuarioModel.findOne( { email } ) // email: email
        return userFound
    } catch (error) {   
        console.log('[getUserByEmail]: Error al obtener el usuario', error)
    }

}

const createUser = async (nuevoUsuario) => {

    try {
        const usuarioCreado = new UsuarioModel(nuevoUsuario) // nuevoUsuario = {name, email, password}
        usuarioCreado.password = await usuarioCreado.encriptarPassword(nuevoUsuario.password) // guardo password encriptado remplazando el password que viene desde el input sin encriptar
        await usuarioCreado.save()
        return usuarioCreado
    } catch (error) {
        console.log('[createUser]: Error no se pudo crear el usuario', error)
    }

    
}

const checkUserPassowrd = async (usuario, password) => {

    try {
        const isMatch = await usuario.comprobarPassword(password) // true o false
        return isMatch
    } catch (error) {
        console.log('[checkUserPassowrd]: Algo ocurrió al comprobar los password', error)
    }
}

const getUsuarioById = async (id) => {

    try {
        const usuario = await UsuarioModel.findById(id)
        return usuario
    } catch (error) {
        console.log(`[getUsuarioById]: Algo ocurrió al obtener el usuario con id: ${id}`, error)
    }

}

export default {
    getUserByEmail, 
    createUser, 
    checkUserPassowrd, 
    getUsuarioById
}