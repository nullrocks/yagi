/**
 * This module is a pure abstraction layer to keep entities free of RESTFul requests,
 * it also handles the host and path for each endpoint.
 */

'use strict';

const request = require('request');
const handler = require('./response-handler');
const env = require('../config/environment');

/**
 * @description API method index
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


/**
 * Following functions are just HTTP requests and configurations to their respective endpoints.
 */


function getClient(id) {
  let config = {
    uri : env.host + '/clientes/' + id,
    json : true,
    headers : {
      'authorization' : env.token
    }
  };
  
  return handler(new Promise(resolve => {
    request.get(config, (error, response, body) => {
      resolve({ error, response, body });
    })
  }));
}

function createClient(client) {
  let config = {
    uri : env.host + '/clientes',
    json : client,
    headers : {
      'authorization' : env.token
    }
  };
  
  return handler(new Promise((resolve) => {
    request.post(config, (error, response, body) => {
      resolve({ error, response, body });
    });
  }));
}


function getCard(id) {
  let config = {
    uri : env.host + '/tarjetas/' + id,
    json : true,
    headers : {
      'authorization' : env.token
    }
  };
  
  return handler(new Promise((resolve) => {
    request.get(config, (error, response, body) => {
      resolve({ error, response, body });
    })
  }));
}

function createCard(card) {
  let config = {
    uri : env.host + '/tarjetas',
    json : card,
    headers : {
      'authorization' : env.token
    }
  };
  
  return handler(new Promise((resolve) => {
    request.post(config, (error, response, body) => {
      resolve({ error, response, body });
    })
  }));
}

function getTransaction(id) {
  let config = {
    uri : env.host + '/transacciones/' + id,
    json : true,
    headers : {
      'authorization' : env.token
    }
  };
  
  return handler(new Promise((resolve) => {
    request.get(config, (error, response, body) => {
      resolve({ error, response, body });
    })
  }));
}

function processTransaction(transaction) {
  let config = {
    uri : env.host + '/transacciones',
    json : transaction,
    headers : {
      'authorization' : env.token
    }
  };
  
  return handler(new Promise((resolve) => {
    request.post(config, (error, response, body) => {
      resolve({ error, response, body });
    })
  }));
}