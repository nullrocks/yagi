'use strict';

const messages = require('../config/messages.json');
const rest = require('./rest');
const validation = require('./validation');

let transaction = {
  get,
  process,
  prepare,
  validate
};

/**
 * Get a previously processed transaction object
 * @param id {string} - Transaction ID
 * @param callback {function} - Callback that handles API response
 */
function get(id, callback) {
  
  if ( !id ) {
    callback(new Error(messages.transaction.error.id), null);
    return;
  }
  
  rest.transaction.get(id).then(response => {
    callback(null, response);
  }, error => {
    callback(error, null);
  });
}

/**
 * Process payment/transaction sending it to the API
 * @param tx {Object} - Payment data
 * @param callback {function} - Callback that handles API response
 */
function process(tx, callback) {
  
  if ( validate(tx) !== true ) {
    callback(new Error(messages.transaction.error.validation), null);
    return;
  }
  
  // If the object has unnecessary properties, trim them out.
  let preparedTx = prepare(tx);
  
  rest.transaction.process(preparedTx).then(response => {
    callback(null, response);
  }, error => {
    callback(error, null);
  });
  
}

/**
 * Trim unnecessary properties and default required
 * @param tx - Payment data
 * @return {Object} - Only required properties
 */
function prepare(tx) {
  
  let prepared = {
    referencia : tx.referencia,
    amount : tx.amount,
    tarjeta : tx.tarjeta
  };
  
  // Since we don't have a list of possible values...
  // TODO: Ask for it, then update this.
  if ( tx.period && parseInt(tx.period) > 0 ) {
    prepared.period = tx.period;
  } else {
    tx.period = 0;
  }
  
  if ( tx.email ) {
    prepared.email = tx.email;
  }
  
  switch ( tx.currency ) {
    case 'MXN':
    case 'USD':
      prepared.currency = tx.currency;
      break;
    default:
      // Because this service is mostly used in Mexico...
      prepared.currency = 'MXN';
      break;
  }
  
  if ( tx.servicio ) {
    prepared.servicio = tx.servicio;
  }
  
  // This is supposed to be required, but the API accepts request without it
  if ( tx.cvv ) {
    prepared.cvv = tx.cvv;
  }
  
  return prepared;
  
}

/**
 * Validate required properties, presence and format
 * @param tx {Object} - Payment data
 * @return {boolean|Array} - true if valid or an Array with errors
 */
function validate(tx) {
  
  // Validate Payment data structure and presence
  return validation(tx, 'transaction');
  
}

module.exports = transaction;