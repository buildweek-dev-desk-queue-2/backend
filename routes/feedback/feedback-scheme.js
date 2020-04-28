const db = require('../../data/db-config.js');

module.exports = {
   get,
   add,
   findByTicketId,
   findById,
   remove,
   put
};

function get() {
   return db('feedback');
};

function add(item) {
   return db('feedback')
      .insert(item);
};

function findByTicketId(ticket_id) {
   return db('feedback').where({
      ticket_id
   });
};

function findById(id) {
   return db('feedback').where({
      id
   });
}

function remove(id) {
   return db('feedback').where({
      id
   }).del();
};

function put(id, changes) {
   return db('feedback').where({
      id
   }).update(changes);
}