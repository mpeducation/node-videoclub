import express from 'express'
import controller from '../controllers/usuarios.controller.js'
const routerUsuarios = express.Router()

// http://localhost:8080/auth/
routerUsuarios.get('/signup', controller.showAuthFormSignUp) /* Muestra form de registro */
routerUsuarios.post('/signup', controller.signup)

routerUsuarios.get('/signin', controller.showAuthFormSignIn) /* Muestra form de logueo */
routerUsuarios.post('/signin', controller.signin)

routerUsuarios.get('/logout', controller.logout)

export default routerUsuarios