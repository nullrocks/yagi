'use strict';

const factory = require('./factory');
const messages = require('../config/messages.json');
const validation = require('./validation');

/**
 * Stored Client entity
 * @class
 * @param client {Object} - Object containing client information
 */
function Client(client) {
  
  this.id = null;
  this.reference = null;
  this.email = null;
  this.name = null;
  
  if ( client ) {
    return this.init(client);
  }
  
}

/**
 * Manually init a stored Client
 * @param client {Object} - Object containing Client information
 */
Client.prototype.init = function (client) {
  
  let validation = this.validate(client);
  
  if ( validation === true && client.id ) {
    this.id = client.id;
    this.reference = client.reference;
    this.email = client.email;
    this.name = client.name;
    this.createdAt = client.created_at || null;
    this.updatedAt = client.updated_at || null;
    return true;
  } else {
    return validation;
  }
  
};

/**
 * Scheme validation necessary for storing a new Client
 * @param client {Object} - Object containing Client information
 * @returns {boolean|Array} true if validation passes or an Array of fields with error
 */
Client.prototype.validate = function (client) {
  
  // Validate Client data structure and presence
  return validation(client, 'client');
  
};

/**
 * Parse Client to JSON
 * @returns {string} JSON representation
 */
Client.prototype.toJson = function () {
  
  return JSON.stringify(this);
  
};

/**
 * Automatically add Client ID and try to create a Card
 * @param card {Object} - Object containing debit/credit Card information
 * @param callback {function} - Callback that handles Card creation service response
 */
Client.prototype.createCard = function (card, callback) {
  
  if ( !this.isLoaded() ) {
    callback(new Error(messages.card.error.validation), null);
    return;
  }
  
  card.cliente = this.id;
  
  factory.createCard(card, callback);
  
};

/**
 * Client is initialized and has an ID
 * @return {boolean}
 */
Client.prototype.isLoaded = function () {
  
  return !!this.id;
  
};

module.exports = Client;