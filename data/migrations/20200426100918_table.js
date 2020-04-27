
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
    //
    // ticket.integer('tech_id', 255)
    // .defaultsTo(0)
    // .references('users.id')
    // .onDelete('CASCADE')
    // .onUpdate('CASCADE')
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
  // REPLACES OLD FEEDBACK TABLE
  // .createTable('feedback', tbl => {
  //   tbl.increments();
  //   tbl.integer('ticket_id', 255)
  //     .notNullable()
  //     .index()
  //     .references('tickets.id')
  //     .onDelete('CASCASE')
  //     .onUpdate('CASCADE');
  //   tbl.string('ticket_title', 255)
  //     .notNullable()
  //     .references('tickets.title')
  //     .onDelete('CASCASE')
  //     .onUpdate('CASCADE');
  //   tbl.integer('tech_id', 255)
  //     .notNullable()
  //     .index()
  //     .references('users.id')
  //     .onDelete('CASCASE')
  //     .onUpdate('CASCADE');
  //   tbl.string('tech_name', 255)
  //     .notNullable()
  //     .index()
  //     .references('users.username')
  //     .onDelete('CASCASE')
  //     .onUpdate('CASCADE');
  //   tbl.string('author', 255)
  //     .notNullable()
  //     .references('users.username')
  //     .onDelete('CASCASE')
  //     .onUpdate('CASCADE');
  //   tbl.string('message', 255)
  //     .notNullable();
  // });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('feedback')
    .dropTableIfExists('tickets')
    .dropTableIfExists('users')
};
