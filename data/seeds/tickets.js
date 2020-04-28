exports.seed = function(knex) {
   
   return knex('tickets')
   .del()
   .then(function () {
      return knex('tickets').insert([
         {
            title: "Can't submit retro",
            description: "I can't submit a retro. The module is missing in the dropdown.",
            user_id: 1,
         },
         {
            title: "Can't sign in to new slack.",
            description: "I can't get in to slack because I don't have Okta. Help!!!",
            user_id: 2
         },
         {
            title: "Need to go on hiatus",
            description: "Hello, I want to go on hiatus. I'm too tired for this.",
            user_id: 3,
         }
      ]);
   });
   
};
