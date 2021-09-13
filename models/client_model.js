// const getAll = () => {
//     return new Promise((resolve, reject) => {
//         db.query('select * from clients', 
//         (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         });
//     });
// };
const { executeQuery } = require('../helpers');

const getAll = () => {
    return executeQuery('select * from clients');
};

// const getById = (id) => {
//     return new Promise((resolve, reject) => {
//         db.query('select * from clients where id = ?', 
//         [id], 
//         (err, result) => {
//             if (err) return reject(err);
//             resolve(result);
//         });
//     });
// };

const getById = (id) => {
    return executeQuery('select * from clients where id = ?', [id]);
};

const getByUserId = (user_id) => {
    return executeQuery('select * from clients where user_id=?', [user_id]);
};

// const create = ({name, email, address, phone}) => {
//     return new Promise((resolve, reject) => {
//         db.query('insert into clients (name, email, address, phone) values (?,?,?,?)',
//         [name, email, address, phone],
//         (err, result) => {
//             if(err) return reject(err);
//             resolve(result);
//         })
//     });
// };

const create = ({ name, email, address, phone }) => {
    return executeQuery('insert into clients(name, email, address, phone) values(?,?,?,?)', [name, email, address, phone]);
};

const update = (id, { name, email, address, phone }) => {
    return executeQuery('update clients set name=?, email=?, address=?, phone=? where id=?', [name, email, address, phone, id]);
};

const remove = (id) => {
    return executeQuery('delete from clients where id=?', [id]);
};

module.exports = { getAll, create, getById, update, remove, getByUserId }