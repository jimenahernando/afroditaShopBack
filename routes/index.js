var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Funciona de puta madre',
    clasesV2: ['primera', 'segunda', 'tercera'],
    products: 1,
    animals: ['salamanquesa', 'cotorra', 'gato']
  });
});

//GET localhost:3000/info
router.get('/info', function (req, res) {
  res.render('info', 
    { colores : [
      { base: 'rojo', tono: 'carmin'}, 
      { base: 'verde', tono: 'botella'}, 
      { base: 'azul', tono: 'cielo'}
    ]} 
  );
});

module.exports = router;