const swaggerAutogen = require('swagger-autogen')();
const appConfig = require('./config/app');
// process.env.HOST

const doc = {
  info: {
    title: 'Emergency Preparedness application',
    description: 'EPA'
  },
  host: '',
  schemes: ['http,https']
};

const outputFile = 'swagger.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
