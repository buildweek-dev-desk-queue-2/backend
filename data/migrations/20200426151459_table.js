
exports.up = function(knex) {
    return knex.schema.createTable('users', user => {
        user.increments()
              .primary();
      
      user.string('username', 128)
          .notNullable()
          .unique()
          .index();
      user.string('password', 128)
          .notNullable();
      user.string('account_type')
          .defaultsTo('user')
    })
    .createTable('tickets', ticket => {
        ticket.increments()
  
      ticket.string('title', 128)
              .notNullable()
      ticket.string('description')
              .notNullable()
      ticket.integer('user_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('users')
              .onDelete('CASCADE')
              .onUpdate('CASCADE')
    })
    .createTable('feedback', feedback => {
        feedback.integer('id')
  
      feedback.string('title', 128)
              .notNullable()
      feedback.integer('user_id')
              .unsigned()
              .notNullable()
              .references('id')
              .inTable('users')
              .onDelete('CASCADE')
              .onUpdate('CASCADE')
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('feedback')
      .dropTableIfExists('tickets')
      .dropTableIfExists('users')
  };
  