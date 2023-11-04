import mongoose from "mongoose";

/* -------------------------------------------------- */
/* Schema (La estructura que va a tener el documento) */
/* -------------------------------------------------- */
const peliculasSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true
        }
    }
)

/* -------------------------------------------------- */
/* Model (a partir del Schema)                        */
/* -------------------------------------------------- */

const PeliculaModel = mongoose.model('peliculas', peliculasSchema)

/* -------------------------------------------------- */
/* Métodos de interacción con la Base de datos        */
/* -------------------------------------------------- */

const obtenerTodasLasPeliculas = async () => {

    try {
        const peliculas = await PeliculaModel.find({}).lean()
        //console.log(peliculas instanceof mongoose.Document)
        //console.log(peliculas instanceof Object)
        return peliculas
    } catch (error) {
        console.error('[obtenerTodasLasPeliculas]: Error de lectura de las pelis', error)
        return null
    }
}

const obtenerPeliculaPorId = async (id) => {

    try {
        const pelicula = await PeliculaModel.findById(id).lean() // null si no encuentra la película
        return pelicula
    } catch (error) {
        console.error('[obtenerPeliculaPorId]: Error al buscar película por ID', error)
        return null
    }

}

const guardarPelicula = async (nuevaPelicula) => {
    try {

        let pelicula = new PeliculaModel(nuevaPelicula)
        pelicula = await pelicula.save() // Si la película no se crea, me devuelve null
        //console.log(pelicula)
        return pelicula
        
    } catch (error) {
        console.log('ERROR al guardar la película', error)
        return null
    }
}

const actualizarPelicula = async (id, peliculaEditada) => {

    try {
        const pelicula = await PeliculaModel.findByIdAndUpdate(id, peliculaEditada)
        return pelicula
    } catch (error) {
        console.log('[actualizarPelicula]: Error al querer actualizar la película', error)
        return null
    }
}

export default {
    obtenerTodasLasPeliculas,
    obtenerPeliculaPorId,
    guardarPelicula,
    actualizarPelicula
}


