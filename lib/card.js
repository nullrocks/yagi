'use strict';

const messages = require('../messages.json');
const validate = require('validate.js');
const CONSTRAINTS = require('../config/constraints').CARD;
const transactionService = require('./transaction');

/**
 *
 * @param card
 * @constructor
 */
function Card(card) {
  
  this.id = null;
  this.cliente = null;
  this.card = null;
  this.expirationMM = null;
  this.expirationYY = null;
  this.name = null;
  
  if ( card ) {
    this._init(card);
  }
  
}

Card.prototype._init = function (card) {
  
  let validation = this._validate(card);
  
  if ( validation === undefined ) {
    
    this.id = card.id;
    this.cliente = card.cliente;
    this.card = card.card;
    this.expirationMM = card.expirationMM;
    this.expirationYY = card.expirationYY;
    this.name = card.name;
    this.createdAt = card.created_at || null;
    this.updatedAt = card.updated_at || null;
    
  } else {
    throw new Error(validation);
  }
  
};

Card.prototype._validate = function (card) {
  
  // Validate Card data structure and presence
  return validate(card, CONSTRAINTS.CREATE);
  
};


Card.prototype._validateId = function (id) {
  
  // Validate Card ID format and presence
  return validate({ id }, CONSTRAINTS.GET);
  
};


Card.prototype.toJson = function () {
  
  return JSON.stringify(this);
  
};

Card.prototype.transaction = function (tx, callback) {
  
  if ( !this.isLoaded() ) {
    callback(new Error(messages.client.error.validation), null);
    return;
  }
  
  tx.tarjeta = this.id;
  
  transactionService.process(tx, callback);
  
};


Card.prototype.isLoaded = function () {
  
  return !!this.id;
  
};

module.exports = Card;