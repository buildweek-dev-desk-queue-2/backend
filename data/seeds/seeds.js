
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'davethedev', password: 'securepassword', email: 'superawesomeemail@gmail.com', account_type: 'technician'},
        { username: 'fred', password: 'insecurepassword', email: 'randomemail@gmail.com', account_type: 'user'},
        { username: 'billy', password: 'randompassword', email: 'someemail@gmail.com', account_type: 'user'}
      ]);
    });
};
