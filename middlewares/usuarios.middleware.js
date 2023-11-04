
const isAuthenticated = (req, res, next) =>{

    if ( req.isAuthenticated() ) { // Si la sesión está activa, verifica en la colección sessions
        return next() 
    }

    res.redirect('/api/auth/signin') // si no está en los registros de sesión.
}

export default isAuthenticated