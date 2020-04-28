const db = require('../../data/db-config.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('users').select('id', 'username', 'password', 'email', 'account_type');
};

function findById(id) {
    return db('users').where({id});
};

async function add(user) {
    return db('users')
        .insert(user, 'id')
};

function update(changes, id) {
    return db('users')
    .where({id})
    .update(changes);
}

function remove(id) {
    return db('users')
        .where({id})
        .del();
};