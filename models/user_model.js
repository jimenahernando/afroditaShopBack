const { executeQuery, executeQueryUnique } = require('../helpers')

const getAll = () => {
    return executeQuery('SELECT * FROM users');
 }

const getByEmail = (email) => {
    return executeQueryUnique('SELECT * FROM users WHERE email = ?', [email]);
}

const getById = (id) => {
    return executeQueryUnique('SELECT * FROM users WHERE id = ?', [id]);
}

const create = ({username, email, password}) => {
    return executeQuery('INSERT INTO users (username, email, password, role) VALUES (?,?,?,?)', [username, email, password, 'R']);
}

module.exports = { create, getByEmail, getAll, getById }

//SON DISTINTOS
// const getByEmail = (email) => {
// }
// const getByEmail = ({ email }) => {
// }

// EN AL EJECUCION
// getByEmail({ email: 'jimena@gmail.com'});
// getByEmail(email: 'jimena@gmail.com');