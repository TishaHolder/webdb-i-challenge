//pre-populate our database with sample data in order to see it in action. 
//Seeds allow us to easily add and reset sample data.


exports.seed = function(knex, Promise) {
  //if you leave off truncate or delete you will get a sqlite error because of the unique constraint
  //so we need to truncate new information before we seed new data
  return knex('accounts').truncate() //truncates resets the primary key back to one afer you delete the tables
    .then(function () { //we pass an array into the insert method
      return knex('accounts').insert([ //id will be autogenerateed so we don't have to write in
        { name: 'account-01', budget: 4000.00 },
        { name: 'account-02', budget: 206.75 },
        { name: 'account-03', budget: 6789.00 },
        { name: 'account-04', budget: 199.99 },
        { name: 'account-05', budget: 22.34 },
        { name: 'account-06', budget: 300.00 },
        { name: 'account-07', budget: 7000.00 },
        { name: 'account-08', budget: 78800.00 },
        { name: 'account-09', budget: 3030.30 },
        { name: 'account-10', budget: 19.56 },
        { name: 'account-11', budget: 19.91 },
        { name: 'account-12', budget: 7080.00 },
        { name: 'account-13', budget: 1234.00 },
      ]);
    });
};
