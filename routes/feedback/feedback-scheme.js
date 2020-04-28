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
   return db('feedback as f')
      .join('users as u','f.author_id', 'u.id')
      .join('tickets as t', 'f.ticket_id', 't.id')
      .select('f.id as feedback_id', 'u.username as author_name', 'f.ticket_id', 't.title', 'f.message');
};

function add(item) {
   return db('feedback')
      .insert(item);
};

function findByTicketId(ticket_id) {
   return db('feedback as f')
   .join('users as u','f.author_id', 'u.id')
   .join('tickets as t', 'f.ticket_id', 't.id')
   .select('f.id as feedback_id', 'u.username as author_name', 'f.ticket_id', 't.title', 'f.message')
   .where({
      ticket_id
   });
};

function findById(id) {
   return db('feedback as f')
   .join('users as u','f.author_id', 'u.id')
   .join('tickets as t', 'f.ticket_id', 't.id')
   .select('f.id as feedback_id', 'u.username as author_name', 'f.ticket_id', 't.title', 'f.message')
   .where({
      'f.id':id
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