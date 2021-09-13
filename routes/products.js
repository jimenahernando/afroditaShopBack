const router = require('express').Router();

const { getAll, create, getById, update, remove } = require('../models/product_model');

//GET localhost:3000/products
// apra la paginacion GET http://localhost:3000/products/?page=3
router.get('/', (req, res) => {
    // 1 recuperar todos los productos de la bd
    // 2 pasar todos los datos a la vista
    // 3 en la vista iterar los datos

    const page = req.query.page || 1;
    getAll(page, 5)
        .then(products => res.render('products/index', {
            products,
            page: parseInt(page), 
            message: req.flash('success') }))
        .catch(error => console.log(error))
});

//GET localhost:3000/products/new
router.get('/new', (req, res) => {
    res.render('products/new');
});

// GET localhost:3000/products/productid
router.get('/:productId', async(req, res) => {
    try {
        const product = await getById(req.params.productId);
        console.log(product);
        res.render('products/view', { product });
    } catch (error) {
        console.log(error);
    }
});


//GET localhost:3000/products/edit
router.get('/edit/:productId', (req, res) => {
    getById(req.params.productId)
        .then(product => res.render('products/edit', { product }))
        .catch(err => console.log(error));
});

//GET localhost:3000/products/remove
router.get('/remove/:productId', async(req, res) => {
    try {
        const productoEliminado = await remove(req.params.productId);
        res.redirect('/products');
    } catch (error) {
        console.log(error);
    }
});

//POST localhost:3000/products/create
router.post('/create', async (req, res) => {
    try {
        const nuevoProducto = await create(req.body);
        req.flash('success', 'Se ha creado correctamente el nuevo producto');
        res.redirect('/products');
    } catch (error) {
        console.log(error);
    }
});

router.post('/update', (req, res) => {
    //Que vamos a hacer aqui? ejecutar update del modelo
    //Que datos tengo disponibles? req.body (name, description, price, category)
    //Que datos necesito? id, {name, description, price, category}
    
    console.log(req.body);
    update(req.body.id, req.body)
        .then(producto => res.redirect('/products'))
        .catch(err => console.log(error));
});

module.exports = router;

// TODO: fecha sobre el API