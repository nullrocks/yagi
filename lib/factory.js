'use strict';

const Card = require('./card');
const Client = require('./client');
const rest = require('../config/rest');

module.exports = {
  getClient,
  createClient,
  getCard,
  createCard
};


function createCard(card, callback) {
  
  let newCard = new Card();
  
  // Validate Client data structure and presence
  const validation = newCard._validate(card);
  
  // Throw validation error
  if ( validation !== undefined ) {
    callback(validation, null);
    return false;
  }
  
  // API call
  rest.card.create(card).then(response => {
    newCard._init(response);
    callback(null, newCard);
  }, error => {
    callback(error, null);
  });
  
}

function getCard(id, callback) {
  
  let newCard = new Card();
  
  // Validate ID presence
  const validation = newCard._validateId(id);
  
  // Throw validation error
  if ( validation !== undefined ) {
    callback(validation, null);
    return false;
  }
  
  // API call
  rest.card.get(id).then(response => {
    newCard._init(response);
    callback(null, newCard);
  }, error => {
    callback(error, null);
  });
  
}

function createClient(client, callback) {
  
  let newClient = new Client();
  
  // Validate Client data structure and presence
  const validation = newClient._validate(client);
  
  // Throw validation error
  if ( validation !== undefined ) {
    callback(validation, null);
    return false;
  }
  
  // API call
  rest.client.create(client).then(response => {
    newClient._init(response);
    callback(null, newClient);
  }, error => {
    callback(error, null);
  });
  
}

function getClient(id, callback) {
  
  let newClient = new Client();
  
  // Validate ID presence
  const validation = newClient._validateId(id);
  
  // Throw validation error
  if ( validation !== undefined ) {
    callback(validation, null);
    return false;
  }
  
  // API call
  rest.client.get(id).then(response => {
    newClient._init(response);
    callback(null, newClient);
  }, error => {
    console.log(error);
    callback(error, null);
  });
  
}