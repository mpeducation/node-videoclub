import express from 'express'
const routerPeliculas = express.Router() // Le voy a decir a express que este es un archivo de rutas

import controller from '../controllers/peliculas.controller.js'
import isAuthenticated from '../middlewares/usuarios.middleware.js'

// ! CRUD: R:READ ALL => Método GET ALL
// * http://localhost:8080/api/peliculas/
routerPeliculas.get('/', isAuthenticated, controller.listarPeliculas)

// Formulario de creación
routerPeliculas.get('/create', isAuthenticated, controller.formularioCreacionPeliculas)

// ! CRUD: R:READ ONE => Método GET ONE
// * http://localhost:8080/api/peliculas/id
routerPeliculas.get('/:id', controller.obtenerPeliculaPorId)

// ! CRUD: C:CREATE => Método POST
// * http://localhost:8080/api/peliculas/
routerPeliculas.post('/', isAuthenticated, controller.crearPelicula)
// Formulario de edición
// * http://localhost:8080/api/peliculas/edit/id
routerPeliculas.get('/edit/:id', isAuthenticated, controller.formularioDeEdicionPelicula)

// ! CRUD: U:UPDATE => Método PUT
// * http://localhost:8080/api/peliculas/id
routerPeliculas.put('/:id', isAuthenticated, controller.actualizacionPelicula)

// ! CRUD: D:DELETE => Método DELETE
// * http://localhost:8080/api/peliculas/id
routerPeliculas.delete('/:id', isAuthenticated, controller.eliminacionPelicula)

export default routerPeliculas