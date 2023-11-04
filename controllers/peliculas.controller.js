import modelo from '../models/peliculas.model.js'
import { mongoToObj } from '../utils/mongo-to-obj.js'

const listadoPublico = async (req, res) => {

    try {
        const peliculas = await modelo.obtenerTodasLasPeliculas() 
        console.log(peliculas)
        const data = { peliculas }
        res.status(200).render('public', data)
    } catch (error) {
        console.log('[listadoPublico] no se pudo listar las películas', error)
        res.status(500).send({ mensaje: '[listadoPublico] no se pudo listar las películas' , error})        
    }

}

const listarPeliculas = async (req, res) => {
    //console.log(req.user)
    
    const usuario = req.user?.name
    const correo = req.user?.email

    try {
        const peliculas = await modelo.obtenerTodasLasPeliculas() 
        console.log(peliculas)
        const data = { peliculas, usuario, correo }
        res.status(200).render('index', data)
    } catch (error) {
        console.log('[listarPeliculas] no se pudo listar las películas', error)
        res.status(500).send({ mensaje: '[listarPeliculas] no se pudo listar las películas' , error})        
    }
}
const formularioCreacionPeliculas = (req, res) => { // GET
    res.status(201).render('peliculas/create')
} 
const obtenerPeliculaPorId = (req, res) => {
    res.send('CRUD: R:READ ONE => Método GET ONE')
}
const crearPelicula = async (req, res) => { // POST: CREATE
    console.log(req.body) // <= Data del formulario

    const nuevaPelicula = {
        title: req.body.title,
        year: req.body.year
    }

    const peliculaCreada = await modelo.guardarPelicula(nuevaPelicula)

    if ( !peliculaCreada ) {
        return res.status(400).send('Algo falló al crear la película')
    }

    // console.log(peliculaCreada)
    
    res.status(201).render('peliculas/show', { pelicula: mongoToObj(peliculaCreada) })
}

const formularioDeEdicionPelicula = async (req, res) => {
    const { id } = req.params

    try {
        const pelicula = await modelo.obtenerPeliculaPorId(id)

        if ( !pelicula ) {
            return req.status(400).send('No está la película que usted quier editar')
        }

        const { title, year, _id } = pelicula

        res.status(200).render('peliculas/edit', { title, year, _id })

    } catch (error) {
        console.log('Error EDIT', error)
        res.status(500).send('Algo no salió bien en la carga del formulario de edición')
    }
}

const actualizacionPelicula = async (req, res) => {
    const { id } = req.params
    const producto = req.body

    try {
        const productoEditado = await modelo.actualizarPelicula(id, producto)

        if ( !productoEditado ) {
            return res.status(400).send('No se encontró la película')
        }

        res.redirect('/api/peliculas')
    } catch (error) {
        console.log('Error al querer editar la película', error)
        res.status(500).send('Error al querer editar la película', error)
    }
}
const eliminacionPelicula = (req, res) => {
    console.log(req.params.id)



    res.send('CRUD: D:DELETE => Método DELETE')
}

export default {
    listarPeliculas, 
    formularioCreacionPeliculas, 
    obtenerPeliculaPorId, 
    crearPelicula, 
    formularioDeEdicionPelicula, 
    actualizacionPelicula, 
    eliminacionPelicula,
    listadoPublico
}