/**
 * Set environment host and authentication token
 */

'use strict';

const environment = {
  production : {
    host : 'https://www.adquiramexico.com.mx/securebox/v3'
  },
  development : {
    host : 'https://prepro.adquiracloud.mx/securebox/v3'
  }
};

let env = {};

if ( parseInt(process.env.YAGI_DEVELOPMENT) ) {
  env = environment.development;
} else {
  env = environment.production;
}

env.token = process.env.YAGI_TOKEN;

module.exports = env;