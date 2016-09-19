'use strict';

module.exports = (token, dev) => {
  
  if ( !token ) {
    throw new Error('node-yagi: Token must be provided');
  }
  
  process.env.YAGI_TOKEN = token;
  process.env.YAGI_DEVELOPMENT = (dev) ? '1' : '0';
  
  const factory = require('./lib/factory');
  const Client = require('./lib/client');
  const Card = require('./lib/card');
  const transaction = require('./lib/transaction');
  
  
  return {
    Client,
    createClient : factory.createClient,
    getClient : factory.getClient,
    Card,
    createCard : factory.createCard,
    getCard : factory.getCard,
    transaction
  }
  
};