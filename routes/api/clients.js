const router = require('express').Router();
const { json } = require('express');

const { getAll, create, getById, update, remove, getByUserId } = require('../../models/client_model');
const { getByClient } = require('../../models/product_model');


//GET
// router.get('/', async(req, res) =>{
//     try {
//         const result = await getAll();
//         res.json(result);
//     } catch (err) {
//         res.json({ err: err.message });
//     }
// });

router.get('/', async (req, res) => {
    try {
        const clients = await getAll();
        for (let client of clients) {
            const products = await getByClient(client.id);
            client.products = products;
        }
        res.json(clients);
    } catch (error) {
        res.json({ err: error.message });
    }
});


//POST
router.post('/', async (req, res) => {
    try {
        const result = await create(req.body);
        const product = await getById(result.insertId);
        res.json(product);
    } catch (error) {
        res.json({ err: error.message });
    }
});

//PUT
router.put('/:clientId', async (req, res) => {
    try {
        const result = await update(req.params.clientId, req.body)
        const client = await getById(req.params.clientId);
        // res.json(result); para ver los resultados de los cambios
        res.json(client);
    } catch (error) {
        res.json({ err: error.message });
    }
});

//DELETE
router.delete('/:clientId', async (req, res) => {
    const clientId = req.params.clientId;
    try {
        const client = await getById(clientId);
        console.log(client);
        if (!client || !client.length) {
            return res.send('Cliente inexistente');
        }

        const result = await remove(req.params.clientId);
        res.json({ sucess: "se ha eliminado correctamente" });
    } catch (error) {
        res.json({ err: error.message });
    }
});

//trae los clientes creados por el usuario logueado
router.get('/user', async (req, res) => {
    try {
        const clients = await getByUserId(req.user.id);
        res.json(clients);
    } catch (error) {
        res.json({ err: error.message });
    }
});

module.exports = router;