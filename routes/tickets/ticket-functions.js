const db = require('../../data/migrations/db.js');

module.exports = {
    find,
    findById,
    add,
    update,
    remove
};

function find() {
    return db('tickets').select('id', 'title', 'description', 'user_id');
};

function findById(id) {
    return db('tickets').where({id});
};

async function add(ticket) {
    return db('tickets')
        .insert(ticket, 'id')
};

async function update(id, changes) {
    return db('tickets')
        .where({id})
        .update(changes);
}

function remove(id) {
    return db('tickets')
        .where({id})
        .del();
};