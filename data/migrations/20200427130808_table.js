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
  user.string('email', 128)
          .notNullable()
      user.string('account_type')
          .defaultsTo('user')
    })
    .createTable('tickets', ticket => {
        ticket.increments()
                  .primary()
  
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
              .onUpdate('CASCADE');
      ticket.integer('completed', 1)
               .defaultsTo(0)
               .index();
    })
    .createTable('feedback', feedback => {
      feedback.increments();
      feedback.integer('ticket_id', 255)
          .notNullable()
          .index()
          .references('tickets.id')
          .onDelete('CASCADE')
          .onUpdate('CASCADE');
      feedback.integer('author_id', 255)
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      feedback.string('message', 255)
        .notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('feedback')
      .dropTableIfExists('tickets')
      .dropTableIfExists('users')
  };

