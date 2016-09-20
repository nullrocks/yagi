'use strict';

const messages = require('../config/messages.json');
const transactionService = require('./transaction');
const validation = require('../config/validation');

/**
 * Saved Card entity
 * @param card {Object} - Object containing credit/debit card information
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
    return this.init(card);
  }
  
}

/**
 * Manually init a stored Card
 * @param card {Object} - Object containing credit/debit card information
 */
Card.prototype.init = function (card) {
  
  let validation = this.validate(card);
  
  if ( validation === true && card.id ) {
    this.id = card.id;
    this.cliente = card.cliente;
    this.card = card.card;
    this.expirationMM = card.expirationMM;
    this.expirationYY = card.expirationYY;
    this.name = card.name;
    this.createdAt = card.created_at || null;
    this.updatedAt = card.updated_at || null;
    
    return true;
  } else {
    return validation;
  }
  
};

/**
 * Scheme validation necessary for storing a new Card
 * @param card {Object} - Object containing credit/debit card information
 * @returns {boolean|Array} true if validation passes or an Array of fields with error
 */
Card.prototype.validate = function (card) {
  
  // Validate Card data structure and presence
  let entity = 'card';
  
  if ( card && card.card.length === 4 ) {
    entity = 'storedCard';
  }
  
  return validation(card, entity);
  
};

/**
 * Parse Card to JSON
 * @returns {string} JSON representation
 */
Card.prototype.toJson = function () {
  
  return JSON.stringify(this);
  
};

/**
 * Automatically add Card ID and try to process a transaction
 * @param tx {Object} - Object containing transaction information to process/pay
 * @param callback - Callback to handle Transaction's response
 */
Card.prototype.transaction = function (tx, callback) {
  
  if ( !this.isLoaded() ) {
    callback(new Error(messages.client.error.validation), null);
    return;
  }
  
  tx.tarjeta = this.id;
  
  transactionService.process(tx, callback);
  
};

/**
 * Card is initialized and has an ID
 * @return {boolean}
 */
Card.prototype.isLoaded = function () {
  
  return !!this.id;
  
};

module.exports = Card;