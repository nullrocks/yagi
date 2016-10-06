'use strict';

const Card = require('./card');
const messages = require('../config/messages.json');
const rest = require('./rest');

module.exports = {
  getCard,
  createCard
};

/**
 * Store a new Card
 * @param card
 * @param callback
 */
function createCard(card, callback) {
  
  let newCard = new Card();
  
  // Validate Client data structure and presence
  const validation = newCard.validate(card);
  
  // Throw validation error
  if ( validation !== true ) {
    callback(validation, null);
    return false;
  }
  
  rest.card.create(card).then(response => {
    newCard.init(response);
    callback(null, newCard);
  }, error => {
    callback(error, null);
  });
  
}

/**
 * Fetch stored Card by it's ID
 * @param id
 * @param callback
 */
function getCard(id, callback) {
  
  let card = new Card();
  
  // Validation error
  if ( !id ) {
    callback(new Error(messages.card.error.id), null);
    return;
  }
  
  rest.card.get(id).then(response => {
    card.init(response);
    callback(null, card);
  }, error => {
    callback(error, null);
  });
  
}
