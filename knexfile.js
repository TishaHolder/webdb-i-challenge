//using knex library to find database file and connect to it
module.exports = {
  development: {
    client: 'sqlite3', //database driver
    connection: { //can be an object or a string
      filename: './data/budget.db3', //database file location - in relation from the root folder
    },
    useNullAsDefault: true, //prevents bugs and issues when working with sqlite
    migrations: {
      directory: './data/migrations' //customize where our migrations are located when they are generated
    },
    seeds: {
      directory: './data/seeds'
    }
  },
};
