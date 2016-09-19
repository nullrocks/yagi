/**
 * Constraints for validate.js
 */

module.exports = {
  CLIENT : {
    CREATE : {
      reference : {
        presence : true,
      },
      email : {
        presence : true,
        email : true
      },
      name : {
        presence : true
      }
    },
    GET : {
      id : {
        presence : true
      }
    }
  },
  CARD : {
    CREATE : {
      cliente : {
        presence : true,
      },
      card : {
        presence : true
      },
      expirationMM : {
        presence : true
      },
      expirationYY : {
        presence : true
      },
      name : {
        presence : true
      }
    },
    GET : {
      id : {
        presence : true
      }
    }
  },
  TRANSACTION : {
    PROCESS : {
      referencia : {
        presence : true,
      },
      amount : {
        presence : true
      },
      currency : {
        presence : true
      },
      tarjeta : {
        presence : true
      }
    },
    GET : {
      id : {
        presence : true
      }
    }
  }
};