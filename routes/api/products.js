const router = require('express').Router();
const { json } = require('express');

// const productModel = require('../../models/product_model');
// Extraer solo las funciones que vaamos a usar (destructuring)
const { getAll, getById, create, getByCategory, update, remove } = require('../../models/product_model');

// opcion async-await
router.get('/', async (req, res) => {
    try {
        const result = await getAll();
        res.json(result);
    } catch (err) {
        // res.json(error.message);
        res.json({ err: err.message });
    }
});

// opcion async
router.get('/cat/:category', async (req, res) => {
    try {
        const result = await getByCategory(req.params.category);
        res.json(result);
    } catch (err) {
        res.json({ err: err.message });
    }
});

//recuperar productor por ID (filtro)
// GET localhost:3000/api/products
router.get('/:productId', async (req, res) => {
    try {
        const result = await getById(req.params.productId);
        if (result) {
            res.json(result);
        } else {
            res.json({ error: `El producto con el id: ${req.params.productId} no existe en la base de datos` });
        }
    } catch (err) {
        res.json({ err: err.message });
    }
});

// POST localhost:3000/api/products
router.post('/', async (req, res) => {
    try {
        //creo el producto
        const result = await create(req.body);
        // res.json(result);
        //recupero el producto recien creado
        const product = await getById(result.insertId);
        res.json(product);
    } catch (err) {
        res.json({ err: err.message });
    }
});

// con callback
router.post('/v2', (req, res) => {
    create(req.body)
        .then((result) => {
            getById(result.insertId)
                .then(product => res.json(product))
                .catch(err => res.json({ err: err.message }));
        })
        .catch(err => res.json({ err: err.message }));
});

// PUT localhost:3000/api/products
router.put('/:productId', async (req, res) => {
    try {
        const result = await update(req.params.productId, req.body);
        const product = await getById(req.params.productId);
        // res.json(result); para ver los resultados de los cambios
        res.json(product);
    } catch (err) {
        res.json({ err: err.message })
    }
});

router.put('/:productId/v2', (req, res) => {
    update(req.params.productId, req.body)
        .then(result => {
            getById(req.params.productId)
                .then(product => res.json(product))
                .catch(err => res.json({ err: err.message }));
        })
        .catch(err => res.json({ err: err.message }))
});


// DELETE localhost:3000/api/products
router.delete('/:productId', async(req, res) => {
    const productId = req.params.productId;
    try {
        const product = await getById(productId);
        console.log(product);
        if(!product){
            return res.end('El producto no se encuentra en el sistema');
        }
        const result = await remove(productId);
        res.json({ sucess: "se ha eliminado correctamente" });
    } catch (err) {
        res.json({ err: err.message });
    }
});

module.exports = router;

//MODOS DE PASAR PARAMETROS
// function createPerson(name, surname, age){
//     console.log(name, surname, age);
// }

//PERDEMOS UN POCO LA SEMANTICA POR EL ORDEN
// createPerson('Jimena', 'Hernando', 34);

// function createPerson(person){
//     console.log(person.name, person.surname, person.age);
// }

//CUANDO QUERES USAR LAS PROPIEDADESTENES QUE IR A SU DEFINICION
// createPerson({ name: 'Jimena', surname: 'Hernando', age: 34})

// function createPerson({name, surname, age}){
//     console.log(name, surname, age);
// }
// createPerson({ name: 'Jimena', surname: 'Hernando', age: 34})

// document.getElementById('boton').addEventListener('click', async(event) =>{};