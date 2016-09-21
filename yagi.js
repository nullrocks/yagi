'use strict';

module.exports = (token, dev) => {
  
  if ( !token && !process.env.YAGI_TOKEN ) {
    throw new Error('YAGI_TOKEN missing: Authorization Token must be provided');
  }
  
  process.env.YAGI_TOKEN = token;
  process.env.YAGI_ENV = (dev) ? 'dev' : 'production';
  
  const Client = require('./lib/client');
  const Card = require('./lib/card');
  const factory = require('./lib/factory');
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