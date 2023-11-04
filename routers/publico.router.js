import express from 'express'
const routerPublico = express.Router()
import controller from '../controllers/peliculas.controller.js'

// Listado público
routerPublico.get('/', controller.listadoPublico)

export default routerPublico


