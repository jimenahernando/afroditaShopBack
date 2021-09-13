const router = require('express').Router();
const { json } = require('express');
const bcrypt = require('bcryptjs');

const { body, validationResult} = require('express-validator');
const { create, getByEmail, getAll } = require('../../models/user_model');
const { createToken } = require('../../helpers');


// GET localhost:3000/api/users/register
router.get('/', (req, res) => {
    getAll()
        .then(result => res.json(result))
        .catch(err => res.json({ err: err.message }));
});

// POST localhost:3000/api/users/register
router.post('/register', 
    body('username', 'Debes incluir el campo username con una longitud mayor a 3 caracteres').exists().isLength({min: 3}),
    body('password', 'El password debe tener minimo 3 y maximo 8 caracteres').isLength({ min:3, max:8}).custom((value)=> {
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})");
        return regex.test(value);
    }), 
    body('email', 'Email con formato invalido').isEmail(), 
    async (req, res) => {
        try {
            //mira si de todas las validaciones hechas en midlewares alguna da error
            //le pasamos la peticion a validar, ojo errors no es un array
            const errors = validationResult(req);
            //si no esta vacio, hay errores
            if(!errors.isEmpty()){
                return res.status(400).json( errors.array());
            }
            const user = await getByEmail(req.body.email);
            if (user) {
                //cuestion seguridad: este mensjae indica que hay alguien registrado, da pistas que el email esta registrado
                // return res.json({ err: 'El email ya esta registrado'})    
                return res.json({ err: 'Error en el registro. Revisa los datos' })
            }
            //ENCRIPTAMOS LA PASS
            //la funcion la ejecutamos de manera sincrona
            //salt la cantidad de veces que vamos a aplicar el algoritmo de la encriptacion
            // const passwordEnc = bcrypt.hashSync(req.body.password);
            // req.body.password = passwordEnc;
            //en una linea
            req.body.password = bcrypt.hashSync(req.body.password);
            
            const result = await create(req.body);
            res.json(result);
        } catch (error) {
            res.json({ err: error.message });
        }
    }
);

// POST localhost:3000/api/users/login
router.post('/login', async (req, res)=> {
    try {
        const user = await getByEmail(req.body.email)
        if(!user){
            return res.json({ err: 'Error en usuario y/o contraseña 1'})
        }

        // res.json({ bd: user.password, mellega : req.body.password});
        //funcion que nos permite comparar lo que me llega en el body con lo que tengo en la bd para ese email
        const equal = bcrypt.compareSync(req.body.password, user.password);
        if(!equal){
            res.json({ err: 'Error en usuario y/o contraseña 2' })
        } else {
            res.json({
                success: 'Login correcto',
                token: createToken(user)
            });
        }
    } catch (error) {
        res.json({ err: error.message});        
    }
})

module.exports = router;