const express = require('express');
const app = express();

const appConfig = require('./config/app');

const { initialize } = require('./initializers/db');

const routes = require('./routes');

app.use(routes);

initialize()
  .then(() => {
    app.listen(appConfig.port, () => {
      console.log(`Application listening on port ${appConfig.port}`);
    });
  })
  .catch((err) => console.error(err));
