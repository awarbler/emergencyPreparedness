const appConfig = require('../config/app');
const User = require('../models/user');

const loadUser = async (req, res, next) => {
  console.log(req.headers.authorization);
  const authZeroUser = await fetchAuthZeroUser(req.headers.authorization);
  const user = await findOrCreateUser(authZeroUser);
  req.user = user;
  next();
};

const fetchAuthZeroUser = async (authorizationValue) => {
  const response = await fetch(`${appConfig.authorizationHost}/userinfo`, {
    headers: { Authorization: authorizationValue }
  });
};

const findOrCreateUser = async (authZeroUserJson) => {
  if (!authZeroUserJson) return;

  const existingUser = await User.findOne({ identifier: authZeroUserJson.sub });
  if (existingUser) return existingUser;

  // no user exists in our db yet, les create one with the info we got from auth0

  const newUser = await User.create({
    identifier: authoZeroJson.sub,
    email: authZeroUserJson.email,
    givenName: authZeroUserJson.given_name,
    familyName: authZeroUserJson.family_name,
    locale: authZeroUserJson.locale,
    picture: authZeroUserJson.picture
  });
  return newUser;
};

module.exports = loadUser;
