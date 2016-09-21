'use strict';

/**
 * This module is a pure abstraction layer to keep entities free (as Possible) of RESTFul requests,
 * it also handles the host and path for each endpoint.
 */

const env = require('../config/environment');
const handler = require('./response-handler');
const request = require('request');

/**
 * Build HTTP request and adds authorization token
 * @param config {Object} - RequestJS configuration object
 * @return {Promise}
 */
function apiRequest(config) {
  
  // Add authorization token to headers
  if ( config.headers ) {
    config.headers['authorization'] = env.token;
  } else {
    config.headers = {
      'authorization' : env.token
    };
  }
  
  return handler(new Promise(resolve => {
    request(config, (error, response, body) => {
      resolve({ error, response, body });
    })
  }));
}

/**
 * Following functions are just HTTP requests and configurations to their respective endpoints.
 */

function getClient(id) {
  let config = {
    uri : env.host + '/clientes/' + id,
    method : 'GET',
    json : true
  };
  
  return apiRequest(config);
}

function createClient(client) {
  let config = {
    uri : env.host + '/clientes',
    method : 'POST',
    json : client
  };
  
  return apiRequest(config);
}


function getCard(id) {
  let config = {
    uri : env.host + '/tarjetas/' + id,
    method : 'GET',
    json : true
  };
  
  return apiRequest(config);
}

function createCard(card) {
  let config = {
    uri : env.host + '/tarjetas',
    method : 'POST',
    json : card
  };
  
  return apiRequest(config);
}

function getTransaction(id) {
  let config = {
    uri : env.host + '/transacciones/' + id,
    method : 'GET',
    json : true
  };
  
  return apiRequest(config);
}

function processTransaction(transaction) {
  let config = {
    uri : env.host + '/transacciones',
    method : 'POST',
    json : transaction
  };
  
  return apiRequest(config);
}

/**
 * Export API methods
 */
module.exports = {
  
  client : {
    get : getClient,
    create : createClient,
  },
  
  transaction : {
    process : processTransaction,
    get : getTransaction
  },
  
  card : {
    create : createCard,
    get : getCard
  }
  
};