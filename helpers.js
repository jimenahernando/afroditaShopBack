const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

function executeQuery(query, arrParams = []) {
    return new Promise((resolve, reject) => {
        db.query(query,
            arrParams,
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            })
    });
}

function executeQueryUnique(query, arrParams = []) {
    return new Promise((resolve, reject) => {
        db.query(query,
            arrParams,
            (err, result) => {
                if (err) return reject(err);
                if (result.length !== 1) return resolve(null);
                resolve(result[0]);
            })
    });
}

function createToken(user){
    const payload = {
        user_id: user.id,
        expirated_at: dayjs().add(10,'minute').unix(),
        created_at: dayjs().unix(),
        role: user.role
    };
    //genera y devuelve el token
    return jwt.sign(payload, process.env.SECRET_KEY);
}

module.exports = { 
    executeQuery, 
    executeQueryUnique, 
    createToken 
}