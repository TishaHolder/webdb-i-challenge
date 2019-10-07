//ROUTER FILE HANDLES THE NETWORK REQUESTS AND RESPONSES

//import express
const express = require('express');

//create account router
const accountsRouter = express.Router();

//import model file from the helpers directory with database model interactions
const accountDB = require('../data/dbConfig.js');

/*************************************END POINTS********************************/
accountsRouter.get('/', (req, res) => {

    accountDB('accounts') //same as select all from accounts
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error retrieving the accounts from the database.'})
    })

});

accountsRouter.get('/:id', (req, res) => {

    //everything returned from the database is a collection, even if one record is returned it is wrapped in an array 
    //the database thinks in sets or collection of things
    //we could do .then(accounts[0]) and this will return the first element in the array or we could use first()
    //first() returns only that one item without wrapping it in an array

    const { id } = req.params;

    accountDB('accounts')
    .where({ id })
    .first()
    .then(account => {
        if(account){
            res.status(200).json(account);
        }
        else {
            res.status(404).json( {message: 'The account with the specified id could not be found.'} );
        }
        
    })
    .catch(error => {
        console.log("get by id error", error);
        res.status(500).json( {error: 'There was an error retrieving the account from the database.'} );
    })

});

accountsRouter.post('/', (req, res) => {

    const accountData = req.body;

    if(accountData.name === "" || accountData.budget === ""){
        res.status(400).json ( {message: 'Name and budget are required.'} );
    }
    else {
        accountDB('accounts')
        //sqlite does not care about the id being passed in but we include it anyway because other databases require it
        //sqlite returns an array with the id of the last record inserted
        //you can pass more than one record on an insert but it will only return the id of the last record inserted
        .insert(accountData, 'id')
        .then( ([id]) => { //([id]) - grabs the id instead of wrapping it in an array
            accountDB('accounts')//nest database calls to return the account record using get instead of the id
            .where({ id })
            .first() //if inserting more than one record you will only get the last record that was inserted
            .then(account => {            
                res.status(200).json(account);
            })
            .catch(error => {
                res.status(500).json( {error: 'There was an error retrieving the account from the database.'} );
            })        
       
        })
        .catch(error => {
            res.status(500).json( {error: 'There was an error adding the account to the database.'} );
        })
    }


});

accountsRouter.put('/:id', (req, res) => {

    const { id } = req.params;
    const changes = req.body;

    if(changes.name === "" || changes.budget === ""){
        res.status(400).json ( {message: 'Name and budget are required.'} );
    }
    else {
        accountDB('accounts')
        .where({ id })
        .update(changes) //returns the count of records
        .then (count => {
            res.status(200).json( {message: `Updated ${count} record(s).`} );
        })
        .catch (error => {
            res.status(500).json( {error: 'There was an error updating the account in the database.'} );
        })

    }

});

accountsRouter.delete('/:id', (req, res) => {

    const { id } = req.params;

    accountDB('accounts')
    .where( {id} )
    .delete()
    .then( count => { //returns the count of records that were deleted
        res.status(200).json( {message: `Deleted ${count} record(s).`});
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error deleting the account from the database.'} );
    })    

});

//export accounts router
module.exports = accountsRouter;

