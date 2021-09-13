// console.log('Dentro de la prueba de conexion');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456Aa',
    database: 'Afrodita_shop',
    port: 3306
});

connection.connect((err) => {
    // console.log(err);
    connection.query("SELECT * FROM products", (err, result) => {
        // if(err){
        //     console.log(err.message);
        //     return;
        // }
        if(err){
            return console.log(err.message);
        }
        
        console.log(result);
    })
});