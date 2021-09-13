const { executeQuery, executeQueryUnique } = require('../helpers');

//recupero todos los products

// function getAll(){   
// }

//en funcion flecha
// le ponemos por defecto la pagina 1 y los 5 primeros
const getAll = (page = 1, limit = 5) => {
    return executeQuery('SELECT * FROM products LIMIT ? OFFSET ?', 
    [limit, limit * (page - 1)]);
};

const getById = (productId) => {
    return executeQueryUnique('SELECT * FROM products WHERE id = ?', productId);
};

const getByCategory = (category) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT  * FROM products WHERE category = ?', 
        [category],
        (err, result) => { 
            if (err) return reject(err);
            resolve(result);
        })
    });
}

//
const getByClient = (clientId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT p.* FROM products p, clients_products cp WHERE p.id = cp.product_id AND cp.clients_id = ?',
        [clientId],
        (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
};

//insert nuevo reg en la BD
//insert into products (name, description, price, category, available, created_at) values ()
const create = ({name, description, price, category}) => {
    return new Promise((resolve, reject) => {
        db.query('insert into products (name, description, price, category, available, created_at) values (?,?,?,?,?,?)',
        [name, description, price, category, true, new Date()], 
        (err, result) => {
            if (err) return reject(err); 
            resolve(result);
        })
    });
};

//UPDATE productos SET name = ?, description = ?, price = , category = ? WHERE id = id
const update = (id, {name, description, price, category}) => {
    return new Promise((resolve, reject) => {
        db.query('update products set name = ?, description = ?, price = ?, category = ? WHERE id = ?', 
        [name, description, price, category, id],
        (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    });
}

// DELETE FROM products WHERE id = ?
const remove = (id) =>{
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM products WHERE id = ?', 
        [id],
        (err, result) =>{
            if(err) return reject(err);
            resolve(result);
        })
    });
}

module.exports = {
    // getAll : getAll
    //Si se llaman igual podes especificarlo una sola vez

    // getAll,
    // getById,
    // create
    //puede ser en linea
    getAll, getById, create, getByCategory, update, remove, getByClient
}

