'use strict';

const Client = require('./client');
const messages = require('../config/messages.json');
const rest = require('./rest');

console.log(Client);

module.exports = {
  getClient,
  createClient
};

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
  if ( !id ) {
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