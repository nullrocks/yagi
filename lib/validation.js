'use strict';

/**
 * Constraints for validate.js
 * https://yagi.com.mx/documentacion
 */

const validate = require('validate.js');

let constraints = {
  general : {},
  
  client : {
    reference : {
      presence : true
    },
    email : {
      presence : true,
      email : true
    },
    name : {
      presence : true
    }
  },
  
  card : {
    cliente : {
      presence : true
    },
    card : {
      presence : true,
      format : {
        pattern : /^(34|37|4|5|2).*$/
      },
      length : function (value) {
        if ( value ) {
          // Amex
          if ( (/^(34|37).*$/).test(value) ) return { is : 15 };
          // Visa, Mastercard
          if ( (/^(4|5|2).*$/).test(value) ) return { is : 16 };
        }
        // Unknown card, don't validate length
        return false;
      }
    },
    expirationMM : {
      presence : true,
      numericality : {
        onlyInteger : true,
        greaterThan : 0,
        lessThanOrEqualTo : 12
      }
    },
    expirationYY : {
      presence : true,
      numericality : {
        onlyInteger : true,
        greaterThan : 15,
        lessThan : 100
      }
    },
    name : {
      presence : true
    }
  },
  
  storedCard : {
    cliente : {
      presence : true
    },
    card : {
      presence : true,
      length : { is : 4 }
    },
    expirationMM : {
      presence : true,
      numericality : {
        onlyInteger : true,
        greaterThan : 0,
        lessThanOrEqualTo : 12
      }
    },
    expirationYY : {
      presence : true,
      numericality : {
        onlyInteger : true,
        greaterThan : 15,
        lessThan : 100
      }
    },
    name : {
      presence : true
    }
  },
  
  transaction : {
    amount : {
      presence : true,
      numericality : {
        onlyInteger : true,
        greaterThan : 0
      }
    },
    period : {
      presence : true,
      numericality : {
        onlyInteger : true,
        greaterThanOrEqualThan : 0
      }
    },
    currency : {
      presence : true,
      inclusion : ['MXN', 'USD']
    },
    tarjeta : {
      presence : true
    },
    servicio : {
      numericality : {
        onlyInteger : true,
        greaterThanOrEqualThan : 0
      }
    },
    email : {
      presence : true,
      email : true
    },
    cvv : {
      presence : true
    }
  }
};

/**
 *
 * @param object {Object} - object to validate
 * @param entity {string} - name of the entity to validate (card, client, transaction, etc..)
 * @return {boolean|Array} - true if is valid or an Array with errors
 */
module.exports = function (object, entity) {
  
  let result = false;
  
  if ( constraints.hasOwnProperty(entity) ) {
    result = validate(object, constraints[entity]);
  }
  
  return (result === undefined) ? true : result;
};