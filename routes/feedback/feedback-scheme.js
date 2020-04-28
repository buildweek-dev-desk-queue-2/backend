const db = require('../../data/db-config.js');

module.exports = {
   get,
   add,
   findByTicketId
};

function get() {
   return db('feedback');
};

function add(item) {
   return db('feedback')
      .insert(item);
}

function findByTicketId(ticket_id) {
   return db('feedback').where({
      ticket_id
   });
};