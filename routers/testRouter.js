//ROUTER FILE HANDLES THE NETWORK REQUESTS AND RESPONSES
//connected to model file

//import express
const express = require('express');

//create account router
const accountsRouter = express.Router();

//import model file from the helpers directory with database model interactions
const accountDB = require('../data/helpers/accountsModel.js');

/*************************************END POINTS********************************/
accountsRouter.get('/', (req, res) => {
    
    accountDB.get()  
    .then(accounts => {
        console.log("accounts", accounts);
        res.status(200).json(accounts);
    })
    .catch( error => {
        res.status(500).json({error: 'There was an error retrieving the accounts from the database.'});

    })

})

accountsRouter.get('/:id', (req, res) => {

    const { id } = req.params; //destructure id from req.params.id
    
    accountDB.getById(id)  
    .then(account => {
        if(account){
            res.status(200).json(account);
        }
        else {
            
            res.status(404).json( {message: 'That account id does not exist.'});
        }
        
    })
    .catch( error => {
        console.log("get by id error", error);
        res.status(500).json({error: 'There was an error retrieving the account from the database.'});

    })
})

accountsRouter.post('/'), (req, res) => {

    const postData = req.body;

    accountDB.insert(postData)
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error adding the account to the database.'} );
    })   
    
}

accountsRouter.put('/:id', (req, res) => {

    const { id } = req.params;
    const changes = req.body;

    accountDB.update(id, changes)
    .then(count => {//returns the count of records
        res.status(200).json( {message: `Updated ${count} records.`} );
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error updating the record in the database.'} );
    })

})

accountsRouter.delete('/:id', (req, res) => {

    const { id } = req.params;

    accountDB.delete(id)
    .then(count => {
        res.status(200).json( {message: `Deleted ${count} records.`})
    })
    .catch(error => {
        res.status(500).json( {error: 'There was an error removing the record(s) from the database.'})
    })

})

//export accounts router
module.exports = accountsRouter;


