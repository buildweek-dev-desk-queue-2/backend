
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 111, username: 'davethedev', password: 'securepassword', email: 'superawesomeemail@gmail.com', account_type: 'technician'},
        {id: 112, username: 'fred', password: 'insecurepassword', email: 'randomemail@gmail.com', account_type: 'user'},
        {id: 113, username: 'billy', password: 'randompassword', email: 'someemail@gmail.com', account_type: 'user'}
      ]);
    });
};
