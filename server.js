import express from 'express'
import path from 'node:path'
import mongoose from 'mongoose'
import { engine } from 'express-handlebars'
import methodOverride from 'method-override'
import 'dotenv/config'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import * as passportStrategy from './config/passport.js'

import routerPeliculas from './routers/peliculas.router.js'
import routerUsuarios from './routers/usuarios.router.js'
import routerPublico from './routers/publico.router.js'

// ! Configuraciones
const PORT = process.env.PORT || 8888
const app = express()

// Express Handlebars
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join('.', path.sep, 'views'))

// ! Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

// ! ----- express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create( { mongoUrl: process.env.URI_DB_REMOTA } )
}))

// ! ---- passport
app.use(passport.initialize())
app.use(passport.session())

// ! Rutas
app.use('/', routerPublico)
app.use('/api/peliculas', routerPeliculas)
app.use('/api/auth', routerUsuarios)

// ! Conexión DB
mongoose.connect(process.env.URI_DB_REMOTA)
    .then(() => {
        console.log('Conexión a MONGODB establecida correctamente')
    })
    .catch(() => {
        console.log(`Erorr al conectar a MONGODB, ${error}`)
    })
// ! Arranca Servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)
})