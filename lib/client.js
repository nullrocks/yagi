'use strict';

const messages = require('../messages.json');
const validate = require('validate.js');
const CONSTRAINTS = require('../config/constraints').CLIENT;

/**
 *
 * @param client
 * @constructor
 */
function Client(client) {
  
  this.id = null;
  this.reference = null;
  this.email = null;
  this.name = null;
  
  if ( client ) {
    this._init(client);
  }
  
}

Client.prototype._init = function (client) {
  
  let validation = this._validate(client);
  
  if ( validation === undefined ) {
    this.id = client.id;
    this.reference = client.reference;
    this.email = client.email;
    this.name = client.name;
    this.createdAt = client.created_at || null;
    this.updatedAt = client.updated_at || null;
    
  } else {
    throw new Error(validation);
  }
  
};

Client.prototype._validate = function (client) {
  
  // Validate Client data structure and presence
  return validate(client, CONSTRAINTS.CREATE);
  
};


Client.prototype._validateId = function (id) {
  
  // Validate Client ID format and presence
  return validate({ id }, CONSTRAINTS.GET);
  
};


Client.prototype.toJson = function () {
  
  return JSON.stringify(this);
  
};

Client.prototype.addCard = function (card, callback) {
  
  //TODO
  return;
  
};

Client.prototype.isLoaded = function () {
  
  return !!this.id;
  
};

module.exports = Client;