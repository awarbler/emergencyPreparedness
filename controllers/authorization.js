const appConfig = require('../config/app');
const axios = require('axios');

const authorizationController = {
  login: (req, res) => {
    const authorizationUrl = `${
      appConfig.authorizationHost
    }/authorize?response_type=code&client_id=${
      appConfig.clientID
    }&redirect_uri=${encodeURIComponent(
      appConfig.redirectUrl
    )}&state=1234&scope=openid%20profile%20email`;
    res.redirect(authorizationUrl);
  },
  callback: async (req, res, next) => {
    try {
      const response = await fetch(`${appConfig.authorizationHost}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'applicationx-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: appConfig.clientID,
          client_secret: appConfig.clientSecret,
          redirect_uri: appConfig.redirectUrl,
          scope: 'openid profile email',
          code: req.query.code
        })
      });
      const json = await response.json();

      res.json(json);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authorizationController;
