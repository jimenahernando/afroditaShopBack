const mysql = require('mysql2');

//creamos el pull de conexiones
//que se encarga de abrir, cerra cx
const pool = mysql.createPool({
    // los datos los meteremos en un ficher .env
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

global.db = pool;
