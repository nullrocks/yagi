'use strict';

const messages = require('../config/messages.json');
const rest = require('./rest');

let transaction = {
  process,
  prepare,
  validate
};

function validate(tx) {
  
  // Validate Payment data structure and presence
  // return validate(tx, CONSTRAINTS.PROCESS);
  
}

function process(tx, callback) {
  
  if ( validate(tx) !== undefined ) {
    callback(new Error(messages.transaction.error.validation), null);
    return;
  }
  
  tx = prepare(tx);
  
  // API call
  rest.transaction.process(tx).then(response => {
    callback(null, response);
  }, error => {
    callback(error, null);
  });
  
}

function prepare(tx) {
  
  let prepared = {
    referencia : tx.referencia,
    amount : tx.amount,
    currency : tx.currency,
    tarjeta : tx.tarjeta
  };
  
  if ( tx.period === 0 || tx.period ) {
    prepared.period = tx.period;
  }
  
  if ( tx.email ) {
    prepared.email = tx.email;
  }
  
  if ( tx.servicio ) {
    prepared.servicio = tx.servicio;
  }
  
  if ( tx.cvv ) {
    prepared.cvv = tx.cvv;
  }
  
  return prepared;
  
}

module.exports = transaction;