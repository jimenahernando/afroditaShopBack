const router = require('express').Router();

const { checkToken, checkAdmin, checkRole } = require('./middlewares');
const apiProductsRouter = require("./api/products");
const apiClientsRouter = require("./api/clients");
const apiPublicProductsRouter = require("./api/publicproducts");
const apiUsersRouter = require("./api/users");

//ruta privada
router.use("/products", checkToken, checkRole('A'), apiProductsRouter);
//ruta publica
router.use("/publicproducts", apiPublicProductsRouter);
router.use("/clients", checkToken, checkAdmin, apiClientsRouter);
router.use("/users", apiUsersRouter);

module.exports = router;