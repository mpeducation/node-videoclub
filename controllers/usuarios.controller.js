import passport from 'passport'
import models from '../models/usuarios.model.js'

const showAuthFormSignUp = (req, res) => {
    res.status(200).render('usuarios/signup') // muestra form de registro
}

const showAuthFormSignIn = (req, res) => {
    res.status(200).render('usuarios/signin') // muestra form de logueo
}

const signup = async (req, res) => {
    console.log(req.body)

    try {
        const errors = []
        const { name, email, password, confirm_password } = req.body
        
        if ( password !== confirm_password ) {
            errors.push({msg: 'La contraseña no coincide'})
        }

        if (password.length < 5 ) {
            errors.push({msg: 'La contraseña debe tener al menos 5 caracteres'})
        }

        if ( errors.length > 0 ) {
            return res.send(`Hay errores: ${JSON.stringify(errors)}`)
        }

        const userFound = await models.getUserByEmail(email)

        if ( userFound ) {
            return res.send('Ya existe un usuario en nuestros registros')
        }

        const newUser = await models.createUser({ name, email, password })

        if ( !newUser ) {
            return res.status(400).send('No se pudo crear el usuario')
        }
        
        res.status(200).send('Se registró correctamente')

    } catch (error) {
        res.status(500).send('[signup]:', error)
    }
}

const signin = passport.authenticate('local', {
    successRedirect: '/api/peliculas',
    failureRedirect: '/api/auth/signin'
})

const logout = (req, res, next) => {

    req.logout( ( error ) => {
        if ( error ) return next(err)
        res.redirect('/api/auth/signin')
    })
}


export default {
    showAuthFormSignUp,
    showAuthFormSignIn,
    signup,
    signin,
    logout
}