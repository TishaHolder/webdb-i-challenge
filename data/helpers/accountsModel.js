//MODEL FILE CONTAINS THE MODEL OF DATABASE INTERACTIONS THAT WE HAVE FOR THAT RESOURCE

//import database file
const db = require('../dbConfig.js');

//export each function as you define them - export multiple items from within a single file
module.exports = {
    get,
    getById,
    insert,
    update,
    remove

};

function get(){

    return db('accounts');//same as select all from accounts
}

function getById(id){

    return db('accounts').where({ id }).first();

    
    //everything returned from the database is a collection, even if one record is returned it is wrapped in an array 
    //the database thinks in sets or collection of things
    //we could do .then(accounts[0]) and this will return the first element in the array or we could use first()
    //first() returns only that one item without wrapping it in an array
    
    
}

function insert(account){

    return db('accounts')
    .insert(account) //returns by default an array with the id of the inserted record
    //to return account object - expect an id inside of an array and then call the getById function with that id
    .then( ([id]) => { 
        getById(id);

    })

}

function update(id, changes){

    return db('accounts')
    .where('id', id)
    .update(changes)
    .then(count => {
        count > 0 ? this.get(id) : null;
    })

}

function remove(id){

    return db('accounts')
    .where('id', id)
    .delete()
    .then(count => {
        count > 0 ? this.get(id) : null;
    })
}

