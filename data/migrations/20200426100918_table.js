
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
            .onUpdate('CASCADE')
  })
  .createTable('feedback', feedback => {
    feedback.increments();
    feedback.integer('ticket_id', 255)
        .notNullable()
        .index()
        .references('tickets.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    feedback.integer('tech_id', 255)
      .notNullable()
      .index()
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    feedback.string('tech_name', 255)
      .notNullable()
      .index()
      .references('users.username')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    feedback.string('author', 255)
      .notNullable()
      .references('users.username')
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
