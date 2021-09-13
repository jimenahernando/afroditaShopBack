# TAREAS

## Crear las siguietnes rutas:

GET localhost:3000/products
    VISTA: products/index.
    
GET localhost:3000/products/new
    VISTA: products/new.pug -> GET localhost:3000/products/create

## Recuperar todo los clientes del usuario logueado

GET localhost:3000/products/edit/productid
    VISTA: products/edit.pug
    1 - antes de renderizar la vista tenemos que recuperar el producto a editar
    2 - renderizar la vista y pasarle el producto
    3 - Generar el formulario dentro de la vista
        - Dentro dle formulario debemos incorporar los datos del producto a editar

GET localhost:3000/products/remove/productid
    1 - a parti del id del producto lo borramos de la base de datos
    2 - redirect a /products

GET localhost:3000/products/productid
Objetivo Final: renderizar una vistaque muestr el producto seleccionado
    1- Pensar como crear la ruta
    2 - recuperar el producto
    3- pasar el producto a la vista y renderizarlo