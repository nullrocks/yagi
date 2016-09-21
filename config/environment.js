'use strict';

/**
 * Set environment host and authentication token
 */

const environment = {
  production : {
    host : 'https://www.adquiramexico.com.mx/securebox/v3'
  },
  development : {
    host : 'https://prepro.adquiracloud.mx/securebox/v3'
  }
};

let env = {};

if ( process.env.YAGI_ENV === 'dev' || process.env.YAGI_ENV === 'development' ) {
  env = environment.development;
} else {
  env = environment.production;
}

env.token = process.env.YAGI_TOKEN;

module.exports = env;