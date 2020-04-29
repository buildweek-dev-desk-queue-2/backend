exports.seed = function(knex) {
   
   return knex('feedback')
   .del()
   .then(function () {
      return knex('feedback').insert([
         {
            ticket_id: 1,
            author_id: 4,
            message: 'Hi this is admin koi. Please refer to the current TK for module names. Use the one that matches your current module in the web annex.'
         },
         {
            ticket_id: 1,
            author_id: 1,
            message: 'Ok thanks admin I found it'
         },
         {
            ticket_id: 2,
            author_id: 2,
            message: 'Nevermind I just found the email sorry.'
         }
      ]);
   });
   
};
