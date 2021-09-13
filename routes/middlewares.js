const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const { getById } = require('../models/user_model')

const checkToken = async (req, res, next) => {
    console.log('PASA POR EL MIDDLEWARE CHECKTOKEN');

    // 1 - comprobar si existe el token dentro de las cabeceras
    const token = req.headers['authorization'];
    if (!token) {
        return res.json({ error: 'Debes ingresar cabecera de autenticacion' });
    }

    //2 - desencriptar el token
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(payload);
    } catch (error) {
        return res.json({ error: 'Token incorrecto' });
    }

    //3 - comprobar si esta caducado
    // console.log(payload.expirated_at);
    const fechaActual = dayjs().unix();
    // console.log(fechaActual)
    if (payload.expirated_at < fechaActual) {
        return res.json({ error: 'El token esta caducado' });
    }

    //4 - recuperar el usuario logueado 
    try {
        const user = await getById(payload.user_id);
        //estamos añadiendolo al req, entonces podremos trabajr con este parametros en otras rutas rutas.
        req.user = user;
    } catch (error) {
        res.json({ err: err.message });  
    }

    next();
}

//Si el rol del usuario logueado es A dejar pasar. Si no, devuvle error
//aplicamos el middleware a todas las rutas de clients
const checkAdmin = (req, res, next) => {
    console.log('PASA POR EL MIDDLEWARE CHECKADMIN');
    const role = req.user.role;
    if(role !== 'A'){
        return res.json({ err: 'El usuario no tiene permisos de acceso'});
    }
    next();
}

const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.json({ err: 'Tu rol no tiene permiso para este recurso' });
        }
        next();
    }
};

module.exports = { checkToken, checkAdmin, checkRole }