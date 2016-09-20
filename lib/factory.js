'use strict';

const Card = require('./card');
const Client = require('./client');
const rest = require('./rest');
const messages = require('../config/messages.json');

module.exports = {
  getClient,
  createClient,
  getCard,
  createCard
};

/**
 * Store a new Card
 * @param card
 * @param callback
 */
function createCard(card, callback) {
  
  let newCard = new Card();
  
  // Validate Client data structure and presence
  const validation = newCard.validate(card);
  
  // Throw validation error
  if ( validation !== undefined ) {
    callback(validation, null);
    return false;
  }
  
  rest.card.create(card).then(response => {
    newCard.init(response);
    callback(null, newCard);
  }, error => {
    callback(error, null);
  });
  
}

/**
 * Fetch stored Card by it's ID
 * @param id
 * @param callback
 */
function getCard(id, callback) {
  
  let card = new Card();
  
  // Validation error
  if ( !id || id.length === 0 ) {
    callback(new Error(messages.card.error.id), null);
    return;
  }
  
  rest.card.get(id).then(response => {
    card.init(response);
    callback(null, card);
  }, error => {
    callback(error, null);
  });
  
}

/**
 * Store a new Client
 * @param client
 * @param callback
 */
function createClient(client, callback) {
  
  let newClient = new Client();
  
  // Validate Client data structure and presence
  const validation = newClient.validate(client);
  
  // Validation error
  if ( validation !== true ) {
    callback(validation, null);
    return false;
  }
  
  rest.client.create(client).then(response => {
    newClient.init(response);
    callback(null, newClient);
  }, error => {
    callback(error, null);
  });
  
}

/**
 * Fetch stored Client by it's ID
 * @param id
 * @param callback
 */
function getClient(id, callback) {
  
  let client = new Client();
  
  // Validation error
  if ( !id || id.length === 0 ) {
    callback(new Error(messages.client.error.id), null);
    return;
  }
  
  rest.client.get(id).then(response => {
    client.init(response);
    callback(null, client);
  }, error => {
    callback(error, null);
  });
  
}