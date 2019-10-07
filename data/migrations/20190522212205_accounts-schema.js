
exports.up = function(knex, Promise) { //up represents the change we want to make to our schema
  return knex.schema.createTable('accounts', tbl => {//create table method takes in a table name and a callback
    tbl.increments(); //auto incrementing primary key
    tbl.string('name') //text field called name which is unique and not nullable
      .notNullable()
      .unique();
    tbl.decimal('budget')
      .notNullable();
  });
};

//down represents undoing that change - logic to undo changes in case something goes wrong
exports.down = function(knex, Promise) {
  //dropTableIfExists method takes in the name of the table we want to drop
  return knex.schema.dropTableIfExists('accounts'); 
};
