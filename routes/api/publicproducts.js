const router = require('express').Router();
const { getAll, getById, getByCategory } = require('../../models/product_model');

// CON PAGINADO
// GET localhost:3000/api/products?page=2&limit=5
router.get('/v2', (req, res) => {
    //user agregado en el middleware
    // console.log(req.user);
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    getAll(parseInt(page), parseInt(limit))
        .then(result => res.json(result))
        .catch(err => res.json({ err: err.message }));
});

//opcion callback
router.get('/cat/:category/v2', (req, res) => {
    getByCategory(req.params.category)
        //Te devuelve todos los productos con todas las propiedades 
        // .then(result => {res.json(result)})
        //me devuelva solo los nombre de los productos de la categoria
        .then(result => {
            // const onlyNames = result.map((product) => product.name);
            // res.json(onlyNames);
            const names = [];
            for (let product of result) {
                names.push(product.name);
            }
            res.json(names);
        })
        .catch(err => res.json({ err: err.message }));
});

router.get('/:productId/v2', (req, res) => {
    getById(req.params.productId)
        .then((result) => {
            if (result) {
                res.json(result);
            } else {
                res.json({ error: `El producto con el id: ${req.params.productId} no existe en la base de datos` });
            }
        })
        .catch(err => res.json({ err: err.message }));
});

module.exports = router;